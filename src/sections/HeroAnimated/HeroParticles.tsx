import { useEffect, useRef } from "react"

const TAU = Math.PI * 2
const FADE_IN = 2 // seconds for a particle to reach full brightness

interface Particle {
    x: number
    y: number
    r: number // radius, px
    max: number // peak alpha
    vx: number // px / second
    vy: number
    amp: number // sideways sway, px / second
    sway: number // sway frequency
    tw: number // twinkle frequency
    phase: number
    age: number
    accent: boolean
}

function makeParticle(w: number, h: number, accentRatio: number): Particle {
    const z = Math.random() // pseudo-depth: 0 = far, 1 = near

    return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.55 + z * 1.3,
        max: 0.2 + z * 0.5,
        vx: (Math.random() - 0.5) * 6 * (0.5 + z),
        vy: -(3 + Math.random() * 5) * (0.4 + z), // slow upward float
        amp: 2 + Math.random() * 3,
        sway: 0.3 + Math.random() * 0.6,
        tw: 0.4 + Math.random() * 0.9,
        phase: Math.random() * TAU,
        age: 0,
        accent: Math.random() < accentRatio,
    }
}

interface HeroParticlesProps {
    /** Particles per 10 000 px² of the hero. */
    density?: number
    /** Upper limit for very large screens. */
    maxCount?: number
    /** Share of particles drawn in the accent color (0 to 1). */
    accentRatio?: number
}

/**
 * Self-running particle field. It ignores the mouse, scroll and keyboard:
 * motion comes only from time.
 *
 * Colors come from the CSS variables --particles and --particles-accent
 * (set in Hero.scss) and update when [data-theme] on <html> changes.
 */
export default function HeroParticles({
                                          density = 0.9,
                                          maxCount = 240,
                                          accentRatio = 0.12,
                                      }: HeroParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const box = canvas?.parentElement
        const ctx = canvas?.getContext("2d")
        if (!canvas || !box || !ctx) return

        const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")

        let w = 0
        let h = 0
        let t = 0 // animated time, seconds
        let last = 0
        let raf = 0
        let running = false
        let visible = true
        let reduced = motionMq.matches
        let color = "#888"
        let accent = "#888"
        const particles: Particle[] = []

        const readColors = () => {
            const styles = getComputedStyle(canvas)
            color = styles.getPropertyValue("--particles").trim() || "#888"
            accent = styles.getPropertyValue("--particles-accent").trim() || color
        }

        const draw = () => {
            ctx.clearRect(0, 0, w, h)
            for (const p of particles) {
                const fade = Math.min(1, p.age / FADE_IN)
                const twinkle = 0.7 + 0.3 * Math.sin(t * p.tw + p.phase)
                ctx.globalAlpha = p.max * fade * twinkle
                ctx.fillStyle = p.accent ? accent : color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, TAU)
                ctx.fill()
            }
            ctx.globalAlpha = 1
        }

        const step = (dt: number) => {
            t += dt
            for (const p of particles) {
                p.age += dt
                p.x += (p.vx + Math.sin(t * p.sway + p.phase) * p.amp) * dt
                p.y += p.vy * dt

                // Wrap just outside the edges so nothing visibly pops.
                const m = p.r + 2
                if (p.y < -m) {
                    p.y = h + m
                    p.x = Math.random() * w
                } else if (p.y > h + m) {
                    p.y = -m
                }
                if (p.x < -m) p.x = w + m
                else if (p.x > w + m) p.x = -m
            }
        }

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame)
            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            step(dt)
            draw()
        }

        const start = () => {
            if (running || reduced || !visible) return
            running = true
            last = performance.now()
            raf = requestAnimationFrame(frame)
        }

        const stop = () => {
            running = false
            cancelAnimationFrame(raf)
        }

        const resize = () => {
            const nw = box.clientWidth
            const nh = box.clientHeight
            if (!nw || !nh) return

            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.round(nw * dpr)
            canvas.height = Math.round(nh * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            // Keep the existing field, just stretch it to the new size.
            if (w && h) {
                for (const p of particles) {
                    p.x *= nw / w
                    p.y *= nh / h
                }
            }
            w = nw
            h = nh

            const target = Math.min(maxCount, Math.round(((w * h) / 10000) * density))
            while (particles.length < target) particles.push(makeParticle(w, h, accentRatio))
            particles.length = Math.min(particles.length, target)

            if (reduced) particles.forEach((p) => (p.age = FADE_IN))
            draw()
        }

        const onMotionChange = () => {
            reduced = motionMq.matches
            if (reduced) {
                stop()
                particles.forEach((p) => (p.age = FADE_IN))
                draw()
            } else {
                start()
            }
        }

        const onThemeChange = () => {
            readColors()
            if (!running) draw()
        }

        readColors()
        resize()

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(box)

        // Don't burn CPU while the hero is scrolled out of view.
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) start()
            else stop()
        })
        intersectionObserver.observe(box)

        // The site switches themes through <html data-theme="...">.
        const themeObserver = new MutationObserver(onThemeChange)
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        })

        motionMq.addEventListener("change", onMotionChange)

        return () => {
            stop()
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            themeObserver.disconnect()
            motionMq.removeEventListener("change", onMotionChange)
        }
    }, [density, maxCount, accentRatio])

    return (
        <div className="hero__bg" aria-hidden="true">
            <canvas ref={canvasRef} className="hero__canvas" />
        </div>
    )
}
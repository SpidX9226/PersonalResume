import { useRef, type CSSProperties } from "react"
import {
    motion,
    useMotionTemplate,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "motion/react"
import HeroParticles from "./HeroParticles.tsx"
import "./HeroAnimated.scss"

// Apple-like "expo out" easing: fast start, long soft landing.
const EASE = [0.22, 1, 0.36, 1] as const

// Sticky header: 72px nav + 1px border (see Header.scss). Keep in sync.
const HEADER_HEIGHT = 73

/* ---------- Content: edit this, not the markup ---------- */

interface HeroLink {
    label: string
    href: string
}

interface Profile {
    eyebrow: string
    name: string
    role: string
    description: string
    status?: string
    cta: HeroLink
    links: HeroLink[]
}

const profile: Profile = {
    eyebrow: "hello! i'm",
    name: "Said Makhov",
    role: "full-stack developer",
    description:
        "I build web apps with React, TypeScript and ASP.NET Core, from the interface down to the database.",
    // status: "open to work",
    cta: { label: "get in touch", href: "#contact" },
    links: [
        { label: "github", href: "https://github.com/SpidX9226" },
        { label: "hh", href: "https://hh.ru/" }, // TODO: link to your hh.ru résumé
    ],
}

/* ---------- Variants (load sequence) ---------- */

const stack: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: EASE },
    },
}

// The name: each word rises out of its own mask.
const nameGroup: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
}

const word: Variants = {
    hidden: { y: "112%" },
    show: { y: "0%", transition: { duration: 1.2, ease: EASE } },
}

export default function Hero() {
    const { eyebrow, name, role, description, status, cta, links } = profile

    const ref = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()

    // 0 -> 1 while the hero is pinned: from the moment its top reaches the
    // bottom edge of the header until its bottom reaches the bottom of the screen.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${HEADER_HEIGHT}px`, "end end"],
    })

    // A little spring smoothing gives the "weighty" Apple feel.
    const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 })

    const opacity = useTransform(p, [0.08, 0.75], [1, 0])
    const scale = useTransform(p, [0, 1], [1, 0.9])
    const y = useTransform(p, [0, 1], [0, -80])
    const blur = useTransform(p, [0.08, 0.75], [0, 16])
    const filter = useMotionTemplate`blur(${blur}px)`
    const cueOpacity = useTransform(p, [0, 0.08], [1, 0])

    return (
        <section
            id="hero"
            ref={ref}
            className={`hero${reduce ? " hero--static" : ""}`}
            style={{ "--header-height": `${HEADER_HEIGHT}px` } as CSSProperties}
            aria-labelledby="hero-name"
        >
            <div className="hero__sticky">
                <HeroParticles />

                <motion.div
                    className="hero__content"
                    style={reduce ? undefined : { opacity, scale, y, filter }}
                >
                    <motion.div
                        className="hero__stack"
                        variants={stack}
                        initial={reduce ? false : "hidden"}
                        animate="show"
                    >
                        {status && (
                            <motion.p className="hero__status" variants={fadeUp}>
                                <span className="hero__status-dot" aria-hidden="true" />
                                {status}
                            </motion.p>
                        )}

                        <div className="hero__title">
                            <motion.p className="hero__eyebrow" variants={fadeUp}>
                                {eyebrow}
                            </motion.p>

                            <motion.h1
                                id="hero-name"
                                className="hero__name"
                                variants={nameGroup}
                                aria-label={name}
                            >
                                {name.split(" ").map((w, i) => (
                                    <span className="hero__word" key={`${w}-${i}`} aria-hidden="true">
                                        <motion.span variants={word}>{w}</motion.span>
                                    </span>
                                ))}
                            </motion.h1>
                        </div>

                        <motion.p className="hero__role" variants={fadeUp}>
                            {role}
                        </motion.p>

                        <motion.p className="hero__desc" variants={fadeUp}>
                            {description}
                        </motion.p>

                        <motion.div className="hero__actions" variants={fadeUp}>
                            <motion.a
                                className="hero__button"
                                href={cta.href}
                                whileHover={reduce ? undefined : { scale: 1.03 }}
                                whileTap={reduce ? undefined : { scale: 0.97 }}
                                transition={{ duration: 0.25, ease: EASE }}
                            >
                                {cta.label}
                            </motion.a>

                            <div className="hero__links">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        className="hero__link"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {!reduce && (
                    <motion.span
                        className="hero__cue"
                        style={{ opacity: cueOpacity }}
                        aria-hidden="true"
                    />
                )}
            </div>
        </section>
    )
}
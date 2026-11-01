import { useEffect, useState } from "react";

// Must be in the same order as the sections appear on the page.
const SECTION_IDS: string[] = [ "about", "skills", "projects", "experience", "contact", ];
// A section becomes active once its top edge passes this line (fraction of viewport height).
const TRIGGER_LINE = 0.35;

export function useActiveSection() { const [activeSection, setActiveSection] = useState<string | null>(null);
    useEffect(() => {
        const sections = SECTION_IDS
            .map((id: string) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (!sections.length) {
            return;
        }

        let frame = 0;

        const update = () => {
            frame = 0;

            const reachedBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

            let current: string | null = null;

            if (reachedBottom) {
                // The last section can be too short to ever reach the trigger line.
                current = sections[sections.length - 1].id;
            } else {
                const line = window.innerHeight * TRIGGER_LINE;

                for (const section of sections) {
                    if (section.getBoundingClientRect().top <= line) {
                        current = section.id;
                    }
                }
            }

            // null above the first section (the hero), so the highlight clears there.
            setActiveSection(current);
        };

        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(frame);
        };
    }, [])

    return activeSection;
}
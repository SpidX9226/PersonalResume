import Reveal from "../Reveal.tsx";
import "./Experience.scss"

export default function Experience() {
    return (
        <section className="section" id="experience">
            <div className="container">
                <Reveal as="p" className="section__label">04 / EXPERIENCE</Reveal>
                <Reveal as="h2" className="section__title">Опыт</Reveal>

                <Reveal as="ol" className="experience__timeline">
                    <li className="experience__timeline__item">
                        Будущее с вами!
                    </li>
                </Reveal>
            </div>
        </section>
    )
}
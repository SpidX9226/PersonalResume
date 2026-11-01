import "./About.scss"
import Reveal from "../Reveal.tsx";

export default function About() {
    return (
        <section id="about" className="section">
            <div className="container">

            <Reveal as="p" className="section__label" >01 / ABOUT</Reveal>
            <Reveal as="h2" className="section__title">Обо мне</Reveal>

            <div className="about__content">

                <Reveal as="p" delay={0.4}>
                    Я разработчик, интересующийся fullstack-разработкой,
                    архитектурой программного обеспечения и оптимизацией и созданием лучшего по.
                </Reveal>

                <Reveal as="p" delay={0.4}>
                    Мне нравится разбираться в сложных системах,
                    изучать новые технологии и писать простой,
                    понятный и поддерживаемый код.
                </Reveal>

            </div>

            </div>
        </section>
    )
}
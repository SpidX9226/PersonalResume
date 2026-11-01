import Reveal from "../Reveal.tsx";
import "./Projects.scss";

export default function Projects() {
    return (
        <section id="projects" className="section">
            <div className="container">

                <Reveal as="p" className="section__label" >03 / PROJECTS</Reveal>
                <Reveal as="h2" className="section__title">Проекты</Reveal>



                <div className="projects-showcase">
                    <Reveal as="article" className="project" delay={0.1}>
                        <div className="project__number">01</div>

                        <h3>Task Manager</h3>

                        <p>
                            Веб-приложение для управления задачами,
                            пользователями и проектами.
                        </p>

                        <div className="project__tags">
                            <span>Java</span>
                            <span>Spring</span>
                            <span>PostgreSQL</span>
                        </div>

                        <a href="#" className="project__link">
                            GitHub →
                        </a>
                    </Reveal>

                    <Reveal as="article" className="project" delay={0.2}>
                        <div className="project__number">02</div>

                        <h3>Weather API</h3>

                        <p>
                            REST API для получения и обработки
                            данных о погоде.
                        </p>

                        <div className="project__tags">
                            <span>Python</span>
                            <span>FastAPI</span>
                            <span>Docker</span>
                        </div>

                        <a href="#" className="project__link">
                            GitHub →
                        </a>
                    </Reveal>

                    <Reveal as="article" className="project" delay={0.3}>
                        <div className="project__number">03</div>

                        <h3>Minecraft Mod</h3>

                        <p>
                            Мод для Minecraft с собственными игровыми
                            механиками и генерацией мира.
                        </p>

                        <div className="project__tags">
                            <span>Java</span>
                            <span>NeoForge</span>
                            <span>Minecraft</span>
                        </div>

                        <a href="#" className="project__link">
                            GitHub →
                        </a>
                    </Reveal>

                    <Reveal as="article" className="project" delay={0.4}>
                        <div className="project__number">04</div>

                        <h3>Movie Service</h3>

                        <p>
                            Сервис для поиска фильмов, просмотра
                            информации и добавления их в избранное.
                        </p>

                        <div className="project__tags">
                            <span>Java</span>
                            <span>Spring</span>
                            <span>SQL</span>
                        </div>

                        <a href="#" className="project__link">
                            GitHub →
                        </a>
                    </Reveal>
                </div>

            </div>
        </section>

    )
}
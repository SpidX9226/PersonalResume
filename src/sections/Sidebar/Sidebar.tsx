import "./Sidebar.scss"
import {useActiveSection} from "../../hooks/useActiveSection.ts";

const navLinks = [
    { id: "about", label: "Обо мне" },
    { id: "skills", label: "Навыки" },
    { id: "projects", label: "Проекты" },
    { id: "experience", label: "Опыт" },
    { id: "contact", label: "Контакты" }
];

export default function Sidebar() {
    const activeSection = useActiveSection();

    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                {
                    navLinks.map(({ id, label }) => {
                        const isActive = id === activeSection;

                        return (
                            <a key={id} href={`#${id}`} className={`sidebar__link ${isActive ? "active" : ""}`}>
                                <span className="sidebar__dot"></span>
                                {label}
                            </a>
                        )
                    })
                }
            </nav>
        </aside>
    );
}
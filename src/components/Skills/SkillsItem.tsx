import type {Skill} from "../../models/Skill.ts";
import "./SkillsItem.scss";

export default function SkillsItem({ img_path, title, desc }: Skill) {
    return (
        <a className="skill">
            <img className="skill__icon" src={`${import.meta.env.BASE_URL}${img_path.replace(/^\/+/, '')}`} alt={title} />
            <div className="skill__info">
                <span className="skill__title">{title}</span>
                { desc && <span className="skill__desc">{desc}</span> }
            </div>
        </a>
    )
}
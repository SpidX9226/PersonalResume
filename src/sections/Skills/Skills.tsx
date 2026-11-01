import SkillsScroll from "../../components/Skills/SkillsScroll.tsx";


export default function Skills() {
    return (
        <section id="skills" className="section">

            <div className="container">

                <p className="section__label">02 / SKILLS</p>
                <h2 className="section__title">Навыки</h2>

                <div className="skills__showcase">
                    <SkillsScroll path="/data/skillLangs.json" is_direction_left={true} />
                    <SkillsScroll path="/data/skillLangs.json" is_direction_left={false} />
                    <SkillsScroll path="/data/skillLangs.json" is_direction_left={true} />
                </div>
            </div>

        </section>
    )
}
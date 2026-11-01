import type {SkillsInfo} from "../../models/SkillsInfo.ts";
import type {Skill} from "../../models/Skill.ts";
import getJson from "../../scripts/getJson.ts";
import SkillsItem from "./SkillsItem.tsx";
import {useEffect, useState} from "react";
import "./SkillsScroll.scss"
import Reveal from "../../sections/Reveal.tsx";


export default function SkillsScroll({path, is_direction_left}: SkillsInfo) {
    const [skills, setSkills] = useState<Skill[] | null>(null);

    useEffect(() => {
        getJson<Skill[]>(path)
            .then(setSkills)
            .catch(console.error);
    }, [])

    if (!skills) {
        return <p>Loading...</p>;
    }

    return (
        <Reveal as="div">
            <div className="skills__row">
                <div className={`skills__row__content ${is_direction_left ? "left" : "right"}`}>
                    {
                        [...skills, ...skills].map((skill: Skill) =>
                            <SkillsItem img_path={skill.img_path} title={skill.title} desc={skill.desc} />
                        )
                    }
                </div>
            </div>
        </Reveal>
    )
}
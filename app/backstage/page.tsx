import BackStageButton from "@/components/BackStage/BackStageButton";
import { Heading, Text } from "@radix-ui/themes"
import NavigationMenuDemo from "@/components/NavBar"
import PageStyles from './page.module.scss';

import project from '@/utils/projects';

export default function Index() {
    return (
        <>
            <Heading>welc</Heading>
            <Text>hai</Text>

            <label>input</label>
            <input></input>
            <div className={PageStyles['cont']}>
                <section>
                    <p>Triggers</p>
                    <div className={PageStyles['inner']}>
                        {/* {project.triggers.map((trigger) => (
                            <BackStageButton title={trigger.name} trigger={trigger.trigger} />
                        ))} */}
                        {/* triggers is a keyvalue object */}
                        {Object.keys(project.triggers).map((trigger) => (
                            <BackStageButton title={project.triggers[trigger].name} trigger={project.triggers[trigger].trigger} icon={project.triggers[trigger].icon} />
                        ))}
                    </div>
                </section>
                <section>
                    <p>Votes</p>
                    <div className={PageStyles['inner']}>

                    </div>
                </section>
                <section>
                    <p>Info Panels</p>
                    <div className={PageStyles['inner']}>

                    </div>
                </section>
                <section>
                    <p>Logs maybe</p>
                    <div className={PageStyles['inner']}>

                    </div>
                </section>
            </div>
        </>
    )
}

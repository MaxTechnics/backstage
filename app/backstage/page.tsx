'use client';
import BackStageButton from "@/components/BackStage/BackStageButton";
import { Heading, ScrollArea, Text } from "@radix-ui/themes"
import { LogItem } from "@/components/BackStage/LogItem";
import NavigationMenuDemo from "@/components/NavBar"
import PageStyles from './page.module.scss';

import project from '@/utils/projects';
import { useStore } from "@/utils/state";
import { useEffect, useRef } from "react";

export default function Index() {
    const state = useStore();

    const listRef = useRef(null);
    useEffect(() => {
        // @ts-expect-error idk but this works so whatever
        listRef.current?.lastElementChild?.scrollIntoView();
    }, [state.logs]);
    return (
        <>
            {/* <Heading>welc</Heading> */}
            {/* <Text>hai</Text> */}

            {/* <label>input</label> */}
            {/* <input></input> */}
            <div className={PageStyles['cont']}>
                <section>
                    <p className={PageStyles['miniheader']}>Triggers</p>
                    <div className={PageStyles['inner']}>
                        {/* {project.triggers.map((trigger) => (
                            <BackStageButton title={trigger.name} trigger={trigger.trigger} />
                        ))} */}
                        {/* triggers is a keyvalue object */}
                        {Object.keys(project.triggers).map((trigger) => (
                            <BackStageButton title={project.triggers[trigger].name} trigger={project.triggers[trigger].trigger} icon={project.triggers[trigger].icon} key={trigger} />
                        ))}
                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Votes</p>
                    <div className={PageStyles['inner']}>

                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Info Panels</p>
                    <div className={PageStyles['inner']}>

                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Logs maybe</p>
                    <div className={PageStyles['inner']}>
                        <ScrollArea style={{ maxHeight: '300px' }}>
                            <div ref={listRef}>
                                {state.logs.map((log) => <LogItem log={log} key={log.time.toString()} />)}
                            </div>
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    )
}

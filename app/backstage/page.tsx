'use client';
import BackStageButton from "@/components/BackStage/BackStageButton";
import { Heading, ScrollArea, Text } from "@radix-ui/themes"
import { LogItem } from "@/components/BackStage/LogItem";
import NavigationMenuDemo from "@/components/NavBar"
import PageStyles from './page.module.scss';

import project from '@/utils/projects';
import { useStore } from "@/utils/state";
import { useEffect, useRef } from "react";
import { REALTIME_SUBSCRIBE_STATES, RealtimeChannel } from "@supabase/supabase-js";
import supabaseClient from "@/client";
// import { handleTrigger } from "@/utils/postman";


export default function Index() {
    const state = useStore();

    // const postmanInstance = postman();

    const projectChannel = useRef<RealtimeChannel | null>(null);

    const messageReceived = (payload: any) => {
        console.log(payload)
        state.createLog('triggers', 'Received trigger', payload.payload.trigger);
    }

    useEffect(() => {
        projectChannel.current = supabaseClient.channel('bs_project', {
            // config: { broadcast: { ack: true } }
            config: { broadcast: { self: true } }
        });
        // let projectChannel: RealtimeChannel = supabaseClient.channel('bs_project', {
        // config: { broadcast: { ack: true } }
        // });

        // projectChannel.current.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
        //     if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        //         state.createLog('triggers', 'Connected to realtime');
        //     }
        // })

        // projectChannel.current.subscribe((payload) => {
        //     state.createLog('triggers', 'Received trigger', payload);
        // });

        projectChannel.current.on(
            'broadcast',
            { event: 'trigger' },
            (payload) => messageReceived(payload)
        ).subscribe()


    }, []);

    const handleTrigger = async (triggername: string) => {
        const res = await projectChannel.current?.send({
            type: 'broadcast',
            event: `trigger`,
            payload: {
                trigger: triggername
            }
        })

        res === 'ok' ? state.createLog('triggers', 'Sent trigger', triggername) : state.createLog('triggers', 'Trigger failure', triggername);
    }

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
                            <BackStageButton onClick={() => handleTrigger(trigger)} title={project.triggers[trigger].name} trigger={project.triggers[trigger].trigger} icon={project.triggers[trigger].icon} key={trigger} />
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
                                {state.logs.map((log) => <LogItem log={log} key={log.time.toISOString()} />)}
                            </div>
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    )
}

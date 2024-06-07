'use client';
import BackStageButton from "@/components/BackStage/BackStageButton";
import { Box, Card, Flex, Grid, Heading, ScrollArea, Text } from "@radix-ui/themes"
import { LogItem } from "@/components/BackStage/LogItem";
import NavigationMenuDemo from "@/components/NavBar"
import PageStyles from './page.module.scss';

import project from '@/utils/projects';
import { useStore } from "@/utils/state";
import { useEffect, useRef, useState } from "react";
import { REALTIME_SUBSCRIBE_STATES, RealtimeChannel } from "@supabase/supabase-js";
import supabaseClient from "@/client";
// import { handleTrigger } from "@/utils/postman";


export default function Index() {
    const state = useStore();

    const projectChannel = useRef<RealtimeChannel | null>(null);

    const [lastActiveVote, setLastActiveVote] = useState<string | null>(null);
    const [activeVote, setActiveVote] = useState<string | null>(null);
    // const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({});

    const messageReceived = (payload: any) => {
        console.log(payload)
        state.createLog('triggers', 'Received trigger', payload.payload.trigger);

        if (payload.payload.trigger === 'vote_start') {
            setActiveVote(payload.payload.data);
            setLastActiveVote(payload.payload.data);
            // setVoteCounts({}); // Reset the vote counts
            state.clearVoteCount();
        }

        if (payload.payload.trigger === 'vote_end') {
            setActiveVote(null);
            //     // get winning vote
            //     console.warn('a', state.voteCount, state, state.logs)
            //     const entries = Object.entries(state.voteCount);
            //     if (entries.length === 0) {
            //         state.createLog('votes', 'No votes cast');
            //         return;
            //     }
            //     const winningVote = Object.entries(state.voteCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
            //     state.createLog('votes', 'Winning vote', winningVote);
        }
    }

    // useEffect(() => {
    //     if (activeVote === null) {
    //         // Voting has ended
    //         // console.warn('a', voteCounts);
    //         const entries = Object.entries(state.voteCount);
    //         if (entries.length === 0) {
    //             state.createLog('votes', 'No votes cast');
    //             return;
    //         }
    //         const winningVote = entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
    //         state.createLog('votes', 'Winning vote', winningVote);
    //     }
    // }, [activeVote]);

    // @ts-expect-error i don't give a flying fuck
    const handleVote = (payload) => {
        state.createLog('votes', 'Received vote', payload.payload.vote);
        // state.setVoteCount(({
        //     ...state.voteCount,
        //     [payload.payload.vote]: (state.voteCount[payload.payload.vote] || 0) + 1,
        // }));
        state.setVoteCount(payload.payload.vote)
        console.log('vc', JSON.stringify(state.voteCount))
        // setVoteCounts(prevCounts => ({
        // ...prevCounts,
        // [payload.payload.vote]: (prevCounts[payload.payload.vote] || 0) + 1,
        // }));

        console.warn('b', state.voteCount);
    }

    useEffect(() => {
        console.log('voteCount:', JSON.stringify(state.voteCount));
        if (activeVote !== null) return;
        if (lastActiveVote === null) return;
        console.warn('a', state.voteCount, state, state.logs)
        const entries = Object.entries(state.voteCount);
        if (entries.length === 0) {
            state.createLog('votes', 'No votes cast');
            return;
        }
        const winningVote = Object.entries(state.voteCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        state.createLog('votes', 'Winning vote', winningVote);
        const winningTrigger = project.votes[lastActiveVote].choices[winningVote].trigger;
        handleTrigger(winningTrigger.trigger, winningTrigger.data);
    }, [state.voteCount, activeVote]);

    useEffect(() => {
        // going with next has been my biggest fucking regret
        projectChannel.current = supabaseClient.channel('bs_project', {
            // config: { broadcast: { ack: true } }
            config: { broadcast: { self: true } }
        });

        projectChannel.current
            .on(
                'broadcast',
                { event: 'trigger' },
                (payload) => messageReceived(payload)
            )
            .on(
                'broadcast',
                { event: 'vote' },
                (payload) => handleVote(payload)
            )
            .subscribe()
    }, []);

    const handleTrigger = async (triggername: string, data?: string) => {
        const res = await projectChannel.current?.send({
            type: 'broadcast',
            event: `trigger`,
            payload: {
                trigger: triggername,
                data
            }
        })

        res === 'ok' ? state.createLog('triggers', 'Sent trigger', triggername) : state.createLog('triggers', 'Trigger failure', triggername);
    }

    const handleVoteCancel = async () => {
        if (activeVote === null) return;
        setLastActiveVote(null);
        setActiveVote(null);
        state.createLog('votes', 'Cancelling vote');
        await handleTrigger('vote_end');
        state.clearVoteCount();
        state.createLog('votes', 'Vote cancelled');
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
                            <BackStageButton onClick={() => handleTrigger(project.triggers[trigger].trigger, project.triggers[trigger].data)} title={project.triggers[trigger].name} trigger={project.triggers[trigger].trigger} icon={project.triggers[trigger].icon} category={project.triggers[trigger].category} key={trigger} />
                        ))}
                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Votes</p>
                    <div className={PageStyles['inner']}>
                        <Grid columns="2" gap="3" rows="repeat(2, 64px)" width="auto">

                            {Object.keys(project.votes).map((vote) => (
                                <BackStageButton onClick={() => handleTrigger('vote_start', vote)} title={project.votes[vote].name} trigger={project.votes[vote].uid} icon={project.votes[vote].icon} category="" key={vote} />
                            ))}
                            <BackStageButton onClick={() => handleTrigger('vote_end')} title="Finish Vote" trigger="vote_end" icon="circle-x" category="" />
                        </Grid>
                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Info Panels</p>
                    <div className={PageStyles['inner']}>
                        <Grid columns="2" gap="3" rows="repeat(2, 64px)" width="auto">
                            <Box style={{ maxWidth: '240px', width: '100%' }}>
                                <Card>
                                    <Flex gap="3" align="center">
                                        <Box>
                                            <Text as="div" size="2" weight="bold" color='gray'>
                                                Voting active: {activeVote !== null ? 'Yes' : 'No'}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                            <Box style={{ maxWidth: '240px', width: '100%' }}>
                                <Card>
                                    <Flex gap="3" align="center">
                                        <Box>
                                            <Text as="div" size="2" weight="bold" color='gray'>Active session: {activeVote}</Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                            {state.voteCount && Object.keys(state.voteCount).map((vote) => (
                                <Box style={{ maxWidth: '240px', width: '100%' }} key={vote}>
                                    <Card>
                                        <Flex gap="3" align="center">
                                            <Box>
                                                <Text as="div" size="2" weight="bold" color='gray'>{vote}: {state.voteCount[vote]}</Text>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Box>
                            ))}
                            <BackStageButton onClick={() => handleVoteCancel()} title="Cancel vote" trigger="vote_cancel" icon="trash-2" category="" />
                        </Grid>
                    </div>
                </section>
                <section>
                    <p className={PageStyles['miniheader']}>Logs maybe</p>
                    <div className={PageStyles['inner']}>
                        <ScrollArea style={{ maxHeight: '300px' }}>
                            <div ref={listRef} className="flex gap-1 flex-col">
                                {state.logs.map((log) => <LogItem log={log} key={log.time.toISOString()} />)}
                            </div>
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </>
    )
}

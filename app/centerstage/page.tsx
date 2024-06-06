'use client';
import toast, { Toaster } from 'react-hot-toast';
import LW11Background from "@/components/BG/LW11Background"
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';
import supabaseClient from '@/client';
import project from '@/utils/projects';
import VoteButton from '@/components/CenterStage/VoteButton';

const testPromise = new Promise((r, e) => {
    setTimeout(e, 3000);
});

export default function Index() {
    const [activeVote, setActiveVote] = useState<string | null>(null);
    const projectChannel = useRef<RealtimeChannel | null>(null);

    const messageReceived = (payload: any) => {
        console.log(payload)
        // state.createLog('triggers', 'Received trigger', payload.payload.trigger);
        if (payload.payload.trigger === 'vote_start') {
            setActiveVote(payload.payload.data);
        }

        if (payload.payload.trigger === 'vote_end') {
            setActiveVote(null);
        }
    }

    const d = async (time: number) => new Promise(r => setTimeout(r, time));

    const sendVote = async (votename: string) => {
        //todo
        const ipromis = new Promise<void>(async (r, e) => {
            const res = await projectChannel.current?.send({
                type: 'broadcast',
                event: `vote`,
                payload: {
                    vote: votename
                }
            });
            await d(200);
            res === 'ok' ? r() : e();
        });

        toast.promise(ipromis, {
            loading: `Voting...`,
            success: `You voted!`,
            error: `Well shit, that failed`,
        });
    }

    useEffect(() => {
        // going with next has been my biggest fucking regret
        projectChannel.current = supabaseClient.channel('bs_project', {
            // config: { broadcast: { ack: true } }
            config: { broadcast: { self: true } }
        });

        projectChannel.current.on(
            'broadcast',
            { event: 'trigger' },
            (payload) => messageReceived(payload)
        ).subscribe()


        const toastInstance = toast.promise(testPromise, {
            loading: 'Loading test...',
            success: 'Initialized test!',
            error: 'Failed to initialize test.',
        });

        const wakeLock = navigator.wakeLock.request('screen');

        toast.promise(wakeLock, {
            loading: 'Loading wake lock...',
            success: 'Initialized wake lock!',
            error: 'Failed to initialize wake lock.',
        });
    }, []);

    return (
        <>
            <div className="w-full bg-black">
                {/* <div className="w-full h-screen -z-10"> */}
                <LW11Background className="absolute z-0 top-0 left-0 right-0 w-full flex items-center justify-center opacity-100 transition-opacity" />
                {/* </div> */}
                <div className="flex flex-col items-center justify-center h-screen">
                    {!activeVote && (<div className="text-white text-2xl font-bold">Waiting for voting session to start...</div>)}
                    {activeVote && (<div className="text-white text-2xl font-bold">Time to vote fuckers!!!!</div>)}
                    <div className='flex flex-col gap-4'>
                        {activeVote && Object.keys(project.votes[activeVote].choices).map((opt) => (
                            // Please fucking kill me
                            <VoteButton onClick={() => sendVote(opt)} title={project.votes[activeVote].choices[opt].name} trigger={project.votes[activeVote].choices[opt].trigger.trigger} icon={project.votes[activeVote].choices[opt].icon} key={opt} />
                        ))}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

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
    const [activeVote, setActiveVote] = useState<string | null>('experimental');
    const projectChannel = useRef<RealtimeChannel | null>(null);

    const messageReceived = (payload: any) => {
        console.log(payload)
        // state.createLog('triggers', 'Received trigger', payload.payload.trigger);
    }

    const handleTrigger = async (triggername: string) => {
        //todo
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
                <div className="flex items-center justify-center h-screen">
                    {!activeVote && (<div className="text-white text-2xl font-bold">Waiting for voting session to start...</div>)}
                    {activeVote && (<div className="text-white text-2xl font-bold">Active vote: {activeVote}</div>)}
                    {activeVote && Object.keys(project.votes[activeVote].choices).map((opt) => (
                        // Please fucking kill me
                        <VoteButton onClick={() => handleTrigger(opt)} title={project.votes[activeVote].choices[opt].name} trigger={project.votes[activeVote].choices[opt].trigger.trigger} icon={project.votes[activeVote].choices[opt].icon} key={opt} />
                    ))}
                </div>
            </div>
            <Toaster />
        </>
    );
};

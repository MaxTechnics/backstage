'use client';
import supabaseClient from "@/client";
import { REALTIME_SUBSCRIBE_STATES, RealtimeChannel } from "@supabase/supabase-js";
import { useStore } from "@/utils/state";

const state = useStore()

let projectChannel: RealtimeChannel = supabaseClient.channel('bs_project', {
    config: { broadcast: { ack: true } }
});

projectChannel.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
    if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        state.createLog('triggers', 'Connected to realtime');
    }
})

const handleTrigger = async (triggername: string) => {
    const res = await projectChannel.send({
        type: 'broadcast',
        event: `trigger`,
        payload: {
            trigger: triggername
        }
    })

    res === 'ok' ? state.createLog('triggers', 'Sent trigger', triggername) : state.createLog('triggers', 'Trigger failure', triggername);
}

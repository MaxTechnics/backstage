'use client';
import supabaseClient from "@/client"
import { RealtimeChannel, REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js"
import Badge from "@/components/Badge"
import { useState, useEffect } from "react"

const RealTimeLatency = () => {
    const [latency, setLatency] = useState<number>(0)


    useEffect(() => {
        // if (!roomId || !isInitialStateSynced) return

        let pingIntervalId: ReturnType<typeof setInterval> | undefined
        let pingChannel: RealtimeChannel

        // Ping channel is used to calculate roundtrip time from client to server to client
        pingChannel = supabaseClient.channel(`ping:${12}`, {
            config: { broadcast: { ack: true } },
        })
        pingChannel.subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
            if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
                pingIntervalId = setInterval(async () => {
                    const start = performance.now()
                    const resp = await pingChannel.send({
                        type: 'broadcast',
                        event: 'PING',
                        payload: {},
                    })

                    if (resp !== 'ok') {
                        console.log('pingChannel broadcast error')
                        setLatency(-1)
                    } else {
                        const end = performance.now()
                        const newLatency = end - start

                        // if (newLatency >= LATENCY_THRESHOLD) {
                        //   sendLog(
                        //     `Roundtrip Latency for User ${userId} surpassed ${LATENCY_THRESHOLD} ms at ${newLatency.toFixed(
                        //       1
                        //     )} ms`
                        //   )
                        // }

                        setLatency(newLatency)
                    }
                }, 1000)
            }
        })

        return () => {
            pingIntervalId && clearInterval(pingIntervalId)

            pingChannel && supabaseClient.removeChannel(pingChannel)
        }
    }, [true])

    return (
        <Badge>{`Latency: ${latency.toFixed(0)}ms`}</Badge>
    )
}

export default RealTimeLatency;

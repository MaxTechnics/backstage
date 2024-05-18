import type { BackStageIconName } from "@/components/BackStageIcon";

type BackstageTrigger = {
    name: string;
    trigger: string;
    color?: string;
    icon?: BackStageIconName;
}

type BackStageVoteCue = {
    name: string;
    uid: string;
    icon?: BackStageIconName;
}

type BackstageProject = {
    triggers: {
        [key: string]: BackstageTrigger;
    };
    votes: {
        [key: string]: BackStageVoteCue;
    }

}

const proof_of_concept: BackstageProject = {
    triggers: {
        test: {
            name: 'Test',
            trigger: 'bs_trig_test',
            icon: 'squirrel'
        }
    },
    votes: {
        // here's a vote trigger, straight from my ass
        experimental: {
            name: 'Generic fuck',
            uid: 'bs_trig_vote',
            icon: 'vote'
        },
        stop: {
            name: 'Stop!',
            uid: 'bs_stop_vote',
            icon: 'circle-stop'
        }
    }
}

export default proof_of_concept;

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
    votes: {}
}

export default proof_of_concept;

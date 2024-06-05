import type { BackStageIconName } from "@/components/BackStageIcon";

type BackstageTrigger = {
    name: string;
    trigger: string;
    color?: string;
    icon?: BackStageIconName;
    category: 'Engineering' | 'CasparCG'
}

type BackStageVoteCue = {
    name: string;
    uid: string;
    icon?: BackStageIconName;
    choices: {
        [key: string]: {
            name: string;
            uid: string;
            icon?: BackStageIconName;
            trigger: {
                trigger: string,
                data?: string
            }
        }
    }
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
            icon: 'squirrel',
            category: 'CasparCG'
        },
        ccg_clr: {
            name: 'CCG Clear',
            trigger: 'ccg_clr',
            icon: 'power-off',
            category: 'CasparCG'
        }
    },
    votes: {
        // here's a vote trigger, straight from my ass
        experimental: {
            name: 'Generic fuck',
            uid: 'bs_trig_vote',
            icon: 'vote',
            choices: {
                vote_play_video: {
                    name: 'Play video',
                    uid: 'vote_play_video',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'meme'
                    }
                },
                vote_play_photo: {
                    name: 'Play photo',
                    uid: 'vote_play_photo',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'pit'
                    }
                }
            }
        },
        stop: {
            name: 'Stop!',
            uid: 'bs_stop_vote',
            icon: 'circle-stop',
            choices: {}
        }
    }
}

export default proof_of_concept;

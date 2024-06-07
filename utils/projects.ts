import type { BackStageIconName } from "@/components/BackStageIcon";

type BackstageTrigger = {
    name: string;
    trigger: string;
    data?: string;
    color?: string;
    icon?: BackStageIconName;
    category: 'Engineering' | 'CasparCG' | 'This is Adam'
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
        },
        startscreen: {
            name: 'Tia idle',
            trigger: 'ccg_tia_idle',
            icon: 'moon',
            category: 'This is Adam'
        },
        start_tia: {
            name: 'Tia start',
            trigger: 'ccg_play',
            data: 'tia/Intro/Timeline4',
            category: 'This is Adam'
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
                    icon: 'film',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'meme'
                    }
                },
                vote_play_photo: {
                    name: 'Play photo',
                    uid: 'vote_play_photo',
                    icon: 'image',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'pit'
                    }
                }
            }
        },
        tia_0_standsit: {
            name: 'tia start',
            uid: 'tia_0_standsit',
            icon: 'plane-takeoff',
            choices: {
                tia_0_stand: {
                    name: 'Stand',
                    uid: 'tia_0_stand',
                    icon: 'person-standing',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Stand/Timeline2'
                    }
                },
                tia_0_sit: {
                    name: 'Sit',
                    uid: 'tia_0_sit',
                    icon: 'armchair',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Sit/Timeline2'
                    }
                }
            }
        },
        tia_1_keepstandsit: {
            name: 'tia 1 standing',
            uid: 'tia_1_keepstandsit',
            icon: 'person-standing',
            choices: {
                tia_1_keepstand: {
                    name: 'Keep standing',
                    uid: 'tia_1_keepstand',
                    icon: 'person-standing',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Stand/Keep standing/Why are you defying me/Timeline 2'
                    }
                },
                tia_1_sit: {
                    name: 'Sit down',
                    uid: 'tia_1_sit',
                    icon: 'armchair',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Sit/Timeline2'
                    }
                }
            }
        },
        tia_1_booktv: {
            name: 'tia 1 sitting',
            uid: 'tia_1_booktv',
            icon: 'armchair',
            choices: {
                tia_1_book: {
                    name: 'Book',
                    uid: 'uid_1_book',
                    icon: 'book',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Sit/Book/Timeline 4_1'
                    }
                },
                tia_1_tv: {
                    name: 'TV',
                    uid: 'tia_1_tv',
                    icon: 'tv',
                    trigger: {
                        trigger: 'ccg_play',
                        data: 'tia/Intro/Sit/TV/Timeline 2_1'
                    }
                }
            }
        }
    }
}

export default proof_of_concept;

import { create } from 'zustand';

export type BackstageSystem = 'votes' | 'triggers' | 'general';

export type BackStageLog = {
	system: BackstageSystem;
	time: Date;
	message: string;
}

type Store = {
	count: number;
	inc: () => void;
	logs: BackStageLog[];
	createLog: (system: BackstageSystem, ...msg: string[]) => void;
};

export const useStore = create<Store>()((set) => ({
	count: 1,
	inc: () => set((state) => ({ count: state.count + 1 })),
	logs: [],
	// This has got to be the most disgusting way to update data. i fucking hate this. i will be going back to vue as soon as i get the chance............
	createLog: (system: BackstageSystem, ...msg: string[]) => set((state) => ({
		...state,
		logs: [...state.logs, { system, time: new Date(), message: msg.join(' ') }]
	}))
}));

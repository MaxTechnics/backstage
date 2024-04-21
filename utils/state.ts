import { create } from 'zustand';

type BackStageLog = {
	system: 'votes' | 'triggers' | 'general';
	time: Date;
	message: string;
}

type Store = {
	count: number
	inc: () => void
	logs: BackStageLog[]
};

export const useStore = create<Store>()((set) => ({
	count: 1,
	inc: () => set((state) => ({ count: state.count + 1 })),
	logs: []
}));

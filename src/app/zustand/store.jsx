import { create } from 'zustand';

const useStore = create((set) => ({
  count: 1,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;

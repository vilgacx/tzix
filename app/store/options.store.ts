import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OptionsStore {
	add: boolean;
	mass: number;
	toggle_add: () => void;
	set_mass: (weight: number) => void;
}

const useOptionsStore = create<OptionsStore>()(
	persist(
		(set, get) => ({
			add: false,
			mass: 50,
			toggle_add: () => set((state) => ({ add: !state.add })),
			set_mass: (mass: number) => set({ mass }),
		}),
		{
			name: "options",
			storage: createJSONStorage(() => localStorage)
		},
	),
)

export default useOptionsStore;
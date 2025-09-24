import { create } from "zustand";

export interface MainStore {
  menu: boolean;
  submitModal: boolean;
  calculatorModal: boolean;
  toggler: (type: string, boolean: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  menu: false,
  submitModal: false,
  calculatorModal: false,
  toggler: (type, boolean) => set(() => ({
    [type]: boolean
  }))
}))

export default useMainStore;
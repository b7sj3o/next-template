import { create } from "zustand";

export type DrawerEntity = 'article' | 'project';
export type DrawerType = 'edit' | 'create' | 'delete'

export interface AdminStore {
  article: boolean;
  project: boolean;
  type: DrawerType;
  drawerName: DrawerEntity;

  articleId: number,
  projectId: number,

  setDrawerId: (type: string, id: number | string) => void;
  close: (type: string, boolean: boolean) => void;
  toggler: (drawer: DrawerEntity, isOpen: boolean, type: DrawerType) => void;
}

const useMainStore = create<AdminStore>((set) => ({
  article: false,
  project: false,
  type: 'create',
  drawerName: 'article',

  articleId: 0,
  projectId: 0,

  setDrawerId: (drawer: string, id: number | string ) => set(() => ({
    [drawer]: id
  })),
  close: (type, boolean) => set(() => ({
    [type]: boolean
  })),
  toggler: (drawer, isOpen, type) => set(() => ({ 
    [drawer]: isOpen,
    type,
    drawerName: drawer
  }))
}))

export default useMainStore;
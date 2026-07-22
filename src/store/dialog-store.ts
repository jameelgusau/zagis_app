import { create } from "zustand";

interface DialogState {
    isDeleteUserOpen: boolean
    toggleIsDeleteUserOpen: () => void;
}

export const useDialogStore = create<DialogState>((set, get) => ({
    isDeleteUserOpen: false,
    toggleIsDeleteUserOpen: () => {
        set({ isDeleteUserOpen: !get().isDeleteUserOpen});
    },
}));
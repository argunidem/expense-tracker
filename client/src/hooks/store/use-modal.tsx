import { create } from "zustand";

interface Modal {
   isOpen: boolean;
   modal: "details" | "transaction" | null;
   toggleModal: (modal?: "details" | "transaction") => void;
}

const useModal = create<Modal>((set) => ({
   isOpen: false,
   modal: null,
   toggleModal: (modal?: "details" | "transaction") =>
      set((state) => ({
         modal: modal ?? null,
         isOpen: !state.isOpen,
      })),
}));

export default useModal;

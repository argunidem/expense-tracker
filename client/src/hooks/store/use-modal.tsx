import { create } from "zustand";

interface Modal {
   isOpen: boolean;
   modal: "details" | "transaction" | "update" | null;
   toggleModal: (modal?: "details" | "transaction" | "update") => void;
}

const useModal = create<Modal>((set) => ({
   isOpen: false,
   modal: null,
   toggleModal: (modal?: "details" | "transaction" | "update") =>
      set((state) => ({
         isOpen: modal ? true : !state.isOpen,
         modal: modal ?? null,
      })),
}));

export default useModal;

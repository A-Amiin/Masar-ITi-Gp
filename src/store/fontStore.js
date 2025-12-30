import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFontStore = create(
  persist(
    (set) => ({
      fontSize: "16px",
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "font-storage",
      getStorage: () => localStorage,
    }
  )
);
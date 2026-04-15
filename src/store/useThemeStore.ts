import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeConfig, ThemeMode } from '@/types/theme';

interface ThemeState extends ThemeConfig {
  setThemeMode: (mode: ThemeMode) => void;
  setColorPrimary: (color: string) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      colorPrimary: '#1677ff', // Default antd primary color,
      setThemeMode: (mode) => set({ mode }),
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      toggleTheme: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'eam-theme-store', // Tên key sẽ được lưu vào localStorage
    }
  )
);

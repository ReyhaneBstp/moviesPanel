import { create } from 'zustand';
import type { SnackbarSeverity } from '@/shared/components/Snackbar';

interface SnackbarState {
  message: string;
  isOpen: boolean;
  severity: SnackbarSeverity;
}

interface GlobalStore {
  snackbar: SnackbarState;
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
  hideSnackbar: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  snackbar: {
    message: '',
    isOpen: false,
    severity: 'info',
  },
  showSnackbar: (message, severity = 'info') => {
    set({
      snackbar: {
        message,
        isOpen: true,
        severity,
      },
    });
  },
  hideSnackbar: () => {
    set((state) => ({
      snackbar: {
        ...state.snackbar,
        isOpen: false,
      },
    }));
  },
}));

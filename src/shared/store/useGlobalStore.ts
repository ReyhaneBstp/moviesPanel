import { create } from "zustand";
import type { SnackbarSeverity } from "@/shared/components/Snackbar";

interface SnackbarState {
  message: string;
  isOpen: boolean;
  severity: SnackbarSeverity;
}

interface ConfirmDialogState {
  isOpen: boolean;
  operationName: string;
  onConfirm: (() => Promise<void>) | null;
  resolve?: (value: boolean) => void;
}

interface GlobalStore {
  snackbar: SnackbarState;
  confirmDialog: ConfirmDialogState;
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
  hideSnackbar: () => void;
  showConfirmDialog: (
    operationName: string,
    onConfirm: () => Promise<void>
  ) => Promise<boolean>;
  hideConfirmDialog: (result: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  snackbar: {
    message: "",
    isOpen: false,
    severity: "info",
  },
  confirmDialog: {
    isOpen: false,
    operationName: "",
    onConfirm: null,
    resolve: undefined,
  },

  showSnackbar: (message, severity = "info") => {
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

  showConfirmDialog: (operationName, onConfirm) => {
    return new Promise<boolean>((resolve) => {
      set({
        confirmDialog: {
          isOpen: true,
          operationName,
          onConfirm,
          resolve,
        },
      });
    });
  },

  hideConfirmDialog: (result) => {
    set((state) => {
      state.confirmDialog.resolve?.(result);
      return {
        confirmDialog: {
          isOpen: false,
          operationName: "",
          onConfirm: null,
          resolve: undefined,
        },
      };
    });
  },
}));
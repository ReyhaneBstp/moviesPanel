import { useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  severity?: SnackbarSeverity;
  autoCloseDuration?: number;
}

const severityConfig = {
  success: {
    icon: HiCheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: HiXCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: HiExclamation,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    iconColor: 'text-amber-500',
  },
  info: {
    icon: HiInformationCircle,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
};

export function Snackbar({
  message,
  isOpen,
  onClose,
  severity = 'info',
  autoCloseDuration = 5000,
}: SnackbarProps) {
  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-bottom-4 duration-300"
      dir="rtl"
    >
      <div
        className={`flex items-center gap-3 rounded-2xl border ${config.bgColor} ${config.borderColor} px-4 py-3 shadow-lg backdrop-blur-sm min-w-[320px] max-w-md`}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
        <p className={`flex-1 text-sm font-medium ${config.textColor}`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${config.textColor} hover:opacity-70 transition-opacity`}
        >
          <HiX className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

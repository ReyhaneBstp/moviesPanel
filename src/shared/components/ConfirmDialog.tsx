import { useState } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import { useGlobalStore } from "@/shared/store/useGlobalStore";

export function ConfirmDialog() {
  const { confirmDialog, hideConfirmDialog } = useGlobalStore();
  const [loading, setLoading] = useState(false);

  if (!confirmDialog.isOpen) return null;

  const handleConfirm = async () => {
    if (!confirmDialog.onConfirm) return;
    setLoading(true);
    try {
      await confirmDialog.onConfirm();
      hideConfirmDialog(true);
    } catch {
      hideConfirmDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    hideConfirmDialog(false);
  };

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl border border-white/30 bg-white/90 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">
            تأیید عملیات
          </h2>
          <button
            onClick={handleCancel}
            className="btn text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          آیا از انجام عملیات {confirmDialog.operationName} اطمینان دارید؟
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={handleCancel} className="btn btn-ghost btn-md">
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn btn-md btn-primary"
          >
            {loading ? "در حال انجام..." : "تأیید"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

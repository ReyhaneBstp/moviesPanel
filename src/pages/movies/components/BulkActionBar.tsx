import { FaToggleOn, FaToggleOff, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { useMovieStore } from '../store/movieStore';
import { useBulkMovieActions } from '../hooks/useBulkAction';
import { useGlobalStore } from '@/shared/store/useGlobalStore';

export function BulkActionBar() {
  const selectedCount = useMovieStore((s) => s.selectedMovieIdsForBulk.length);
  const clearBulkMovieSelection = useMovieStore((s) => s.clearBulkMovieSelection);
  const { applyBulkAction, isBulkActionInProgress } = useBulkMovieActions();
  const showConfirmDialog = useGlobalStore((s) => s.showConfirmDialog);

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    const operationNames = {
      activate: 'فعال‌سازی فیلم‌ها',
      deactivate: 'غیرفعال‌سازی فیلم‌ها',
      delete: 'حذف فیلم‌ها',
    };

    await showConfirmDialog(operationNames[action], async () => {
      await applyBulkAction(action);
    });
  };

  return (
    <div className="btn gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 text-sm font-medium
    shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition hover:bg-white hover:shadow-md
    border border-white/50">
      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
        {selectedCount} انتخاب
      </span>
      <div className="h-4 w-px bg-gray-300 mx-1" />
      <button
        onClick={() => handleBulkAction('activate')}
        disabled={isBulkActionInProgress}
        className="p-1.5 rounded-full text-emerald-600 hover:bg-emerald-100 active:bg-emerald-200 transition-colors disabled:opacity-40"
        title="فعال کردن انتخاب‌ها"
      >
        <FaToggleOn size={16} />
      </button>
      <button
        onClick={() => handleBulkAction('deactivate')}
        disabled={isBulkActionInProgress}
        className="p-1.5 rounded-full text-amber-600 hover:bg-amber-100 active:bg-amber-200 transition-colors disabled:opacity-40"
        title="غیرفعال کردن انتخاب‌ها"
      >
        <FaToggleOff size={16} />
      </button>
      <button
        onClick={() => handleBulkAction('delete')}
        disabled={isBulkActionInProgress}
        className="p-1.5 rounded-full text-rose-600 hover:bg-rose-100 active:bg-rose-200 transition-colors disabled:opacity-40"
        title="حذف انتخاب‌ها"
      >
        <FaTrashAlt size={14} />
      </button>
      <button
        onClick={clearBulkMovieSelection}
        disabled={isBulkActionInProgress}
        className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        title="لغو انتخاب"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
}
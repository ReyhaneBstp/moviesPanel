import { useState } from "react";
import { useMovieStore } from "@/pages/movies/store/movieStore";
import { movieService } from "@/pages/movies/services/movieService";
import { useGlobalStore } from "@/shared/store/useGlobalStore";

type BulkActionType = "activate" | "deactivate" | "delete";

export function useBulkMovieActions() {
  const [isBulkActionInProgress, setIsBulkActionInProgress] = useState(false);
  const {
    selectedMovieIdsForBulk: selectedIds,
    deleteMultipleMovies,
    setMultipleMoviesActiveStatus,
    clearBulkMovieSelection,
  } = useMovieStore();

  const { showSnackbar } = useGlobalStore();

  const applyBulkAction = async (action: BulkActionType) => {
    if (selectedIds.length === 0) return;

    setIsBulkActionInProgress(true);
    try {
      if (action === "delete") {
        await movieService.bulkDelete(selectedIds);
        deleteMultipleMovies(selectedIds);
      } else {
        const makeActive = action === "activate";
        if (makeActive) {
          await movieService.bulkActivate(selectedIds);
          setMultipleMoviesActiveStatus(selectedIds, true);
        } else {
          await movieService.bulkDeactivate(selectedIds);
          setMultipleMoviesActiveStatus(selectedIds, false);
        }
        clearBulkMovieSelection();
        showSnackbar("عملیات با موفقیت انجام شد!", "success");
      }
    } catch (error) {
      console.error("Bulk action failed:", error);
      showSnackbar("خطا در انجام عملیات!", "error");
    } finally {
      setIsBulkActionInProgress(false);
    }
  };

  return { applyBulkAction, isBulkActionInProgress };
}

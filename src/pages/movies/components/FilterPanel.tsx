import { useMemo, useState } from "react";
import { HiAdjustments, HiX } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { useMovieStore } from "../store/movieStore";
import { useUrlFilters } from "../hooks/useUrlFilters";
import type { Filters } from "../types/filters";

export function FilterPanel() {
  const {
    filters,
    setFilters: onApply,
    resetFilters: onReset,
  } = useUrlFilters();
  const { search, ...restFilters } = filters;
  const [isOpen, setIsOpen] = useState(false);
  const { movies } = useMovieStore();

  const allGenres = useMemo(() => {
    const genreSet = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => genreSet.add(g)));
    return Array.from(genreSet).sort();
  }, [movies]);

  const toggleGenre = (genre: string) => {
    const updated = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onApply({ genres: updated });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-sm px-4 py-3 text-sm font-medium
                   shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition hover:bg-white hover:shadow-md
                   border border-white/50"
      >
        <HiAdjustments className="h-5 w-5 text-primary-500" />
        <span>فیلترها</span>
        {Object.values(restFilters).some(
          (v) =>
            (Array.isArray(v) && v.length > 0) ||
            (typeof v === "string" &&  v !== "all") ||
            (typeof v === "number" && v !== null && v !== 0)
        ) && (
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
            !
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="cursor-pointer fixed inset-0 z-40 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute left-0 top-14 z-50 w-80 rounded-3xl border border-white/30 bg-white/90
                          p-5 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">
                فیلترهای پیشرفته
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-2 block">
                ژانر
              </label>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                      filters.genres.includes(genre)
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                حداقل امتیاز IMDb
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.minRating ?? 0}
                  onChange={(e) =>
                    onApply({ minRating: Number(e.target.value) || null })
                  }
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <span className="flex items-center text-sm font-bold text-amber-500 min-w-[2rem]">
                  {filters.minRating ?? 0}
                  <FaStar className="h-3 w-3 ml-1" />
                </span>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  از سال
                </label>
                <input
                  type="number"
                  value={filters.yearFrom ?? ""}
                  onChange={(e) =>
                    onApply({
                      yearFrom: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="مثلا ۲۰۰۰"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  تا سال
                </label>
                <input
                  type="number"
                  value={filters.yearTo ?? ""}
                  onChange={(e) =>
                    onApply({
                      yearTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="مثلا ۲۰۲۴"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 mb-2 block">
                وضعیت
              </label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "همه" },
                  { value: "active", label: "فعال" },
                  { value: "deactive", label: "غیرفعال" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      onApply({ status: opt.value as Filters["status"] })
                    }
                    className={`cursor-pointer flex-1 rounded-lg py-2 text-xs font-medium transition ${
                      filters.status === opt.value
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onReset}
                className="cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100"
              >
                حذف همه فیلترها
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md
                           hover:bg-primary-700 transition"
              >
                تایید
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

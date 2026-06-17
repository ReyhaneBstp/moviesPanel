import { useMemo, useState } from "react";
import { HiAdjustments, HiX } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { useMovieStore } from "@/pages/movies/store/movieStore";
import { useUrlFilters } from "@/pages/movies/hooks/useUrlFilters";
import type { FiltersModel } from "@/pages/movies/types/filters";

export function FilterPanel() {
  const {
    filters,
    setFilters: setFilterInUrl,
    resetFilters: resetUrl,
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
    setFilterInUrl({ genres: updated });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn gap-2 bg-white/70 backdrop-blur-sm px-4 py-3 text-sm font-medium
                   shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition hover:bg-white hover:shadow-md
                   border border-white/50"
      >
        <HiAdjustments className="h-5 w-5 text-primary-500" />
        <span>فیلترها</span>
        {Object.values(restFilters).some(
          (v) =>
            (Array.isArray(v) && v.length > 0) ||
            (typeof v === "string" && v !== "all") ||
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:bg-black/10 sm:backdrop-blur-none cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[340px] max-h-[85vh] overflow-y-auto sm:absolute sm:top-14 sm:left-0 sm:translate-x-0 sm:translate-y-0 sm:w-80 z-50 card p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">
                فیلترهای پیشرفته
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-1 rounded-md"
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
                    className={`btn btn-sm ${
                      filters.genres.includes(genre)
                        ? "btn-primary"
                        : "bg-gray-100 text-gray-600 border border-primary-200 hover:bg-gray-200"
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
                    setFilterInUrl({
                      minRating: Number(e.target.value) || null,
                    })
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
                <label className="text-xs font-semibold text-gray-500 mb-1 block">از سال</label>
                <input
                  type="number"
                  value={filters.yearFrom ?? ""}
                  onChange={(e) => setFilterInUrl({ yearFrom: e.target.value ? Number(e.target.value) : null })}
                  placeholder="مثلا ۲۰۰۰"
                  className="w-full input"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">تا سال</label>
                <input
                  type="number"
                  value={filters.yearTo ?? ""}
                  onChange={(e) => setFilterInUrl({ yearTo: e.target.value ? Number(e.target.value) : null })}
                  placeholder="مثلا ۲۰۲۴"
                  className="w-full input"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 mb-2 block">وضعیت</label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "همه" },
                  { value: "active", label: "فعال" },
                  { value: "deactive", label: "غیرفعال" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterInUrl({ status: opt.value as FiltersModel["status"] })}
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
              <button onClick={resetUrl} className="btn btn-sm btn-ghost w-full">
                حذف همه فیلترها
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
import { memo, useState } from "react";
import { FaStar, FaEdit } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineGlobeAlt } from "react-icons/hi";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import type { MovieModel } from "@/pages/movies/types/movie";
import { EditMovieDialog } from "./EditMovieDialog";
import { useMovieStore } from "../store/movieStore";

interface MovieRowProps {
  movie: MovieModel;
}

function MovieRowComponent({ movie }: MovieRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleMovieBulkSelection = useMovieStore(
    (state) => state.toggleMovieBulkSelection
  );

  const isSelected = useMovieStore((state) =>
    state.selectedMovieIdsForBulk.includes(movie.id)
  );

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 card p-3 sm:p-2 hover:shadow-md transition-all duration-200 ${
          isSelected
            ? "bg-secondary-800/10 ring-1 ring-secondary-500"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <label className="flex-shrink-0 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleMovieBulkSelection(movie.id)}
              className="w-4 h-4 cursor-pointer rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </label>

          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-16 w-12 sm:h-14 sm:w-10 flex-shrink-0 rounded-xl object-cover shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/40x56?text=N/A";
            }}
          />

          <div className="flex-1 min-w-0 sm:hidden">
            <h4 className="text-sm font-bold text-gray-800 truncate">
              {movie.title}
            </h4>
            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs mt-1">
              <FaStar size={12} className="text-amber-400" />
              <span>{movie.imdb_rating}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="hidden sm:block text-sm font-bold text-gray-800 truncate">
            {movie.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 sm:mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <HiOutlineCalendar size={14} className="sm:w-3 sm:h-3" />
              {movie.year}
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineGlobeAlt size={14} className="sm:w-3 sm:h-3" />
              {movie.country}
            </span>
            <div className="flex gap-1 flex-wrap">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1 text-amber-600 font-bold text-xs">
              <FaStar size={12} className="text-amber-400" />
              <span>{movie.imdb_rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-t-0">
          <div className="flex-shrink-0">
            {movie.is_active ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                <RiCheckboxCircleFill size={14} /> فعال
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">
                <RiCloseCircleFill size={14} /> غیرفعال
              </span>
            )}
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="btn flex-shrink-0 p-2 text-primary-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg bg-gray-50 sm:bg-transparent"
            title="ویرایش فیلم"
          >
            <FaEdit size={16} />
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <EditMovieDialog movie={movie} onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}

export const MovieRow = memo(MovieRowComponent);

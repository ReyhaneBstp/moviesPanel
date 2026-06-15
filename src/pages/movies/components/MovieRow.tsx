import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineGlobeAlt } from "react-icons/hi";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import type { Movie } from "../types/movie";

interface MovieRowProps {
  movie: Movie;
}

function MovieRowComponent({ movie }: MovieRowProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl bg-white p-2
                 border border-transparent hover:bg-primary-50/50
                 hover:border-primary-100 transition-all duration-200"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        loading="lazy"
        className="h-14 w-10 flex-shrink-0 rounded-lg object-cover shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/40x56?text=N/A";
        }}
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">{movie.title}</h4>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-secondary-dark">
          <span className="flex items-center gap-1">
            <HiOutlineCalendar size={12} />
            {movie.year}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineGlobeAlt size={12} />
            {movie.country}
          </span>
          <div className="flex gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-dark"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
        <FaStar size={12} className="text-amber-400" />
        <span>{movie.imdb_rating}</span>
      </div>

      <div className="flex-shrink-0">
        {movie.is_published ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <RiCheckboxCircleFill size={14} />
            منتشر شده
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">
            <RiCloseCircleFill size={14} />
            پیش‌نویس
          </span>
        )}
      </div>
    </div>
  );
}

export const MovieRow = memo(MovieRowComponent);
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
      className="flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur-sm p-2
                 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/90
                 transition-all duration-200"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        loading="lazy"
        className="h-14 w-10 flex-shrink-0 rounded-xl object-cover shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/40x56?text=N/A";
        }}
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-800 truncate">
          {movie.title}
        </h4>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
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
                className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600"
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
        {movie.is_active ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <RiCheckboxCircleFill size={14} />
            فعال
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">
            <RiCloseCircleFill size={14} />
            غیرفعال
          </span>
        )}
      </div>
    </div>
  );
}

export const MovieRow = memo(MovieRowComponent);

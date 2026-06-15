import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineGlobeAlt, HiOutlineCalendar } from "react-icons/hi";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

function MovieCardComponent({ movie }: MovieCardProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-md
                 p-3 shadow-card border border-white/40
                 transition-all duration-300 hover:shadow-glass hover:bg-white/90"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        loading="lazy"
        className="h-24 w-16 flex-shrink-0 rounded-xl object-cover shadow-soft"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/64x96?text=N/A";
        }}
      />

      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
        <h3 className="truncate text-base font-bold text-gray-900">
          {movie.title}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-sm text-secondary-dark">
          <span className="flex items-center gap-1">
            <HiOutlineCalendar className="text-secondary" />
            {movie.year}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineGlobeAlt className="text-secondary" />
            {movie.country}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {movie.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs
                         font-medium text-primary-dark"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <div
        className="flex flex-shrink-0 items-center gap-1 rounded-xl
                   bg-amber-50 px-3 py-1.5 text-amber-600"
      >
        <FaStar className="text-amber-400" />
        <span className="font-bold">{movie.imdb_rating}</span>
      </div>
    </div>
  );
}

export const MovieCard = memo(MovieCardComponent);

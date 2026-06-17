import { memo, useState } from "react";
import { FaStar, FaEdit } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineGlobeAlt } from "react-icons/hi";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import type { MovieModel } from '@/pages/movies/types/movie';
import { EditMovieDialog } from "./EditMovieDialog";
import { useMovieStore } from "../store/movieStore";

interface MovieRowProps {
  movie: MovieModel;
}

function MovieRowComponent({ movie }: MovieRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {selectedMovieIdsForBulk, toggleMovieBulkSelection} = useMovieStore();
  const isSelected = selectedMovieIdsForBulk.includes(movie.id);

  return (
    <>
      <div
        className={`flex items-center gap-3 card hover:shadow-md transition-all duration-200 ${
          isSelected ? 'bg-secondary-800/10 ' : 'hover:bg-white/90'
        }`}
      >
        <label className="flex-shrink-0 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleMovieBulkSelection(movie.id)}
            className="w-4 h-4 cursor-pointer mr-2 rounded-sm border-gray-100 text-primary-600 focus:ring-primary-500"
          />
        </label>

        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-14 w-10 flex-shrink-0 rounded-xl object-cover shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/40x56?text=N/A";
          }}
        />

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-800 truncate">{movie.title}</h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><HiOutlineCalendar size={12} />{movie.year}</span>
            <span className="flex items-center gap-1"><HiOutlineGlobeAlt size={12} />{movie.country}</span>
            <div className="flex gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600">{genre}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
              <FaStar size={12} className="text-amber-400" /><span>{movie.imdb_rating}</span>
            </div>
          </div>
        </div>

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
          className="btn flex-shrink-0 p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
          title="ویرایش فیلم"
        >
          <FaEdit size={16} />
        </button>
      </div>

      {isDialogOpen && (
        <EditMovieDialog movie={movie} onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}

export const MovieRow = memo(MovieRowComponent);
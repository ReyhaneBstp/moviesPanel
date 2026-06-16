import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import type { Movie } from "../types/movie";
import { useMovieStore } from "../store/movieStore";
import { movieService } from "../services/movieService";

interface EditMovieDialogProps {
  movie: Movie;
  onClose: () => void;
}

export function EditMovieDialog({ movie, onClose }: EditMovieDialogProps) {
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);
  const [genresStr, setGenresStr] = useState(movie.genres.join(", "));
  const [isActive, setIsActive] = useState(movie.is_active);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateMovie } = useMovieStore();

  const onSave = async (updatedData: Partial<Movie>) => {
    const updatedMovie = await movieService.updateMovie(movie.id, updatedData);
    updateMovie(updatedMovie);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const genres = genresStr
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    try {
      await onSave({
        title,
        year,
        genres,
        is_active: isActive,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره‌سازی");
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-3xl border border-white/30 bg-white/90 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">
            ویرایش فیلم
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">عنوان</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              سال تولید
            </label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all"
              placeholder="۱۴۰۵"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              ژانرها (با کاما جدا کنید)
            </label>
            <input
              value={genresStr}
              onChange={(e) => setGenresStr(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all"
              placeholder="اکشن, درام"
              required
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsActive(true)}
              className={`cursor-pointer rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              فعال
            </button>
            <button
              type="button"
              onClick={() => setIsActive(false)}
              className={`cursor-pointer rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
                !isActive
                  ? "bg-secondary-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              غیرفعال
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-2"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 transition-all"
            >
              {saving ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
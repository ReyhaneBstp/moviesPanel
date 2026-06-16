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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">ویرایش فیلم</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <HiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              عنوان
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              سال تولید
            </label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="2026"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              ژانرها (با کاما جدا کنید)
            </label>
            <input
              value={genresStr}
              onChange={(e) => setGenresStr(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Action, Drama"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">وضعیت</label>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-xs text-gray-500">
              {isActive ? "فعال" : "غیرفعال"}
            </span>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
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

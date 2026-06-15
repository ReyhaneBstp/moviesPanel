import { HiOutlineFilm } from "react-icons/hi";

interface DashboardHeaderProps {
  count: number;
}

export function DashboardHeader({ count }: DashboardHeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 mb-6 flex items-center justify-between
                 rounded-3xl bg-white/70 px-6 py-4 shadow-glass
                 backdrop-blur-md border border-white/40"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary p-2.5 text-white shadow-soft">
          <HiOutlineFilm size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">داشبورد فیلم‌ها</h1>
          <p className="text-sm text-secondary-dark">مجموعه‌ای از بهترین فیلم‌ها</p>
        </div>
      </div>

      <span
        className="rounded-full bg-primary-50 px-4 py-1.5 text-sm
                   font-semibold text-primary-dark"
      >
        {count} فیلم
      </span>
    </header>
  );
}

import { HiOutlineFilm } from "react-icons/hi";

interface DashboardHeaderProps {
  count: number;
}

export function DashboardHeader({ count }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-soft border border-white/40">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary p-2.5 text-white shadow-soft">
          <HiOutlineFilm size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">مدیریت فیلم‌ها</h2>
          <p className="text-sm text-secondary-dark">لیست تمام فیلم‌های ثبت‌شده</p>
        </div>
      </div>
      <div className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-dark">
        {count} فیلم
      </div>
    </div>
  );
}
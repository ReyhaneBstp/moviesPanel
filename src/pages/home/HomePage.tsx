import { Link } from 'react-router-dom';
import {
  RiMovie2Line,
  RiUser3Line,
  RiSettings3Line,
  RiCoupon3Line,
  RiListSettingsLine,
  RiShoppingBag3Line,
  RiBarChart2Line,
  RiMessage2Line,
} from 'react-icons/ri';

const quickLinks = [
  { to: '/dashboard/movies', icon: RiMovie2Line, label: 'فیلم‌ها', isImplemented: true },
  { to: '/users', icon: RiUser3Line, label: 'کاربران', isImplemented: false },
  { to: '/categories', icon: RiListSettingsLine, label: 'دسته‌بندی‌ها', isImplemented: false },
  { to: '/orders', icon: RiShoppingBag3Line, label: 'سفارش‌ها', isImplemented: false },
  { to: '/tickets', icon: RiCoupon3Line, label: 'تیکت‌ها', isImplemented: false },
  { to: '/messages', icon: RiMessage2Line, label: 'پیام‌ها', isImplemented: false },
  { to: '/reports', icon: RiBarChart2Line, label: 'گزارش‌ها', isImplemented: false },
  { to: '/settings', icon: RiSettings3Line, label: 'تنظیمات', isImplemented: false },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6" dir="rtl">
      <div className="card flex flex-col items-center gap-3 py-10">
        <h1 className="text-2xl font-bold text-primary-600 sm:text-3xl">
          خوش آمدید!
        </h1>
        <p className="text-center text-sm text-secondary-500">
          می‌توانید از طریق لینک‌های زیر به بخش‌های مختلف
          دسترسی داشته باشید.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickLinks.map(({ to, icon: Icon, label, isImplemented }) => (
          <Link
            key={label}
            to={to}
            className="card flex flex-col items-center gap-2 py-6 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <Icon className="text-3xl text-primary-600" />
            <span className="text-sm font-medium text-secondary-700">
              {label}
            </span>
            <span
              className={`text-xs font-normal ${
                isImplemented ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {isImplemented ? 'پیاده‌سازی‌شده' : 'غیر قابل دسترس'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
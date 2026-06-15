import { useState } from "react";
import { HiOutlineHome, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom"; 
import { navItems } from "./navItems";

interface DashboardLayoutProps {
  children: React.ReactNode;
}


export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-bg" dir="rtl">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-white border-l border-gray-100 flex flex-col shadow-soft z-20`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className={`font-bold text-primary ${sidebarOpen ? "text-lg" : "hidden"}`}>
            پنل مدیریت
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-primary-50 text-secondary-dark cursor-pointer"
          >
            {sidebarOpen ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-secondary-dark hover:bg-primary-50 hover:text-primary"
                }`}
              >
                <item.icon size={20} />
                <span className={`${sidebarOpen ? "block" : "hidden"} text-sm font-medium`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary font-bold">
              م
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">مدیر سیستم</span>
                <span className="text-xs text-secondary">admin@example.com</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-white/40 px-6 flex items-center justify-between shadow-soft">
          <h1 className="text-lg font-bold text-gray-900">
            داشبورد فیلم‌ها
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center">
              <HiOutlineHome size={16} />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 bg-neutral-bg">
          {children}
        </div>
      </main>
    </div>
  );
}
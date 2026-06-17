import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { NavigationLinks } from "../shared/NavigationLinks";

interface DesktopSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function DesktopSidebar({ open, onToggle }: DesktopSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`hidden md:flex ${
        open ? "w-64" : "w-20"
      } transition-all duration-300 bg-white border-l border-gray-100 flex-col shadow-soft z-20`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2
          className={`font-bold text-primary transition-opacity ${
            open ? "opacity-100 text-lg" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          پنل مدیریت
        </h2>
        <button
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-primary-50 text-secondary-dark cursor-pointer"
        >
          {open ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavigationLinks
          currentPath={location.pathname}
          showText={open}
        />
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary font-bold">
            م
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">مدیر سیستم</span>
              <span className="text-xs text-secondary">admin@example.com</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
import { useState } from "react";
import { HiOutlineHome, HiOutlineMenu } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { navItems } from "./shared/navItems";
import { DesktopSidebar } from "./desktop/DesktopSidebar";
import { MobileMenu } from "./mobile/MobileMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const selectedNavItem = navItems[location.pathname];

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-bg" dir="rtl">
      <DesktopSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[68px] bg-white/80 backdrop-blur-md border-b border-white/40 px-6 flex items-center justify-between shadow-soft">
          <h1 className="text-lg font-bold text-gray-900">
            <button
              className="md:hidden p-2 rounded-xl hover:bg-primary-50 text-secondary-dark cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <HiOutlineMenu size={20} />
            </button>
            {selectedNavItem?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center">
              <HiOutlineHome size={16} />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 bg-neutral-bg">{children}</div>
      </main>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}

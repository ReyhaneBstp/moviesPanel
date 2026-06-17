import { useEffect } from "react";
import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { NavigationLinks } from "../shared/NavigationLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 transition-opacity duration-300">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-primary-50 text-secondary-dark"
          >
            <HiOutlineX size={20} />
          </button>
          <h2 className="font-bold text-primary">پنل مدیریت</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavigationLinks
            currentPath={location.pathname}
            onItemClick={onClose}
          />
        </nav>
      </div>
    </div>,
    document.body
  );
}
import { Link } from "react-router-dom";
import { navItems } from "./navItems";


interface NavigationLinksProps {
  currentPath: string;
  showText?: boolean;
  onItemClick?: () => void;
}

export function NavigationLinks({
  currentPath,
  showText = true,
  onItemClick,
}: NavigationLinksProps) {
  return (
    <>
      {Object.entries(navItems).map(([path, { label, icon: Icon }]) => {
        const isActive = currentPath === path;
        return (
          <Link
            key={path}
            to={path}
            onClick={onItemClick}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-soft"
                : "text-secondary-dark hover:bg-primary-50 hover:text-primary"
            }`}
          >
            <Icon size={20} />
            {showText && <span className="text-sm font-medium">{label}</span>}
          </Link>
        );
      })}
    </>
  );
}
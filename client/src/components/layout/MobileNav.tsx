import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { X, Home, CalendarDays } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/planner', label: 'Meal Planner', icon: CalendarDays },
];

const MobileNav: FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-[4px_0_24px_rgba(120,90,50,0.1)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-forest-100 px-5 py-4">
          <span className="font-heading text-lg font-bold text-forest-700">
            Menu
          </span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-forest-500 transition-colors hover:bg-forest-50"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-body text-base font-medium text-forest-700 transition-colors hover:bg-forest-50"
                >
                  <Icon size={20} className="text-forest-500" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileNav;

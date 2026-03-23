import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Menu } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-forest-100 bg-white/95 backdrop-blur-sm shadow-[0_2px_12px_rgba(120,90,50,0.06)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ChefHat size={28} className="text-forest-600" />
          <span className="font-heading text-xl font-bold text-forest-700">
            Lutong Tipid
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="font-body text-sm font-medium text-forest-600 transition-colors hover:text-forest-800"
          >
            Home
          </Link>
          <Link
            to="/planner"
            className="font-body text-sm font-medium text-forest-600 transition-colors hover:text-forest-800"
          >
            Planner
          </Link>
          <Button variant="secondary" size="sm">
            Plan My Meals
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-forest-600 transition-colors hover:bg-forest-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;

import type { FC } from 'react';
import { ChefHat } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="bg-forest-800 px-4 py-10 text-center text-white">
      <div className="mx-auto max-w-6xl space-y-3">
        <div className="flex items-center justify-center gap-2">
          <ChefHat size={22} className="text-gold-400" />
          <span className="font-heading text-lg font-bold">Lutong Tipid</span>
        </div>
        <p className="font-body text-sm text-forest-200">
          Masarap na ulam, tipid pa!
        </p>
        <p className="font-body text-xs text-forest-300">
          Made with ❤️ for Filipino families
        </p>
      </div>
    </footer>
  );
};

export default Footer;

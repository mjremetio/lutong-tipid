import { useState, useRef, useEffect, type FC } from 'react';
import { Download, FileText, FileSpreadsheet, Printer, ChevronDown } from 'lucide-react';

interface ExportOption {
  label: string;
  icon: typeof FileText;
  onClick: () => void;
}

interface ExportMenuProps {
  options: ExportOption[];
  label?: string;
}

const ExportMenu: FC<ExportMenuProps> = ({ options, label = 'Export' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-xl border border-forest-300 bg-white px-4 py-2.5 font-heading text-sm font-semibold text-forest-700 shadow-sm transition hover:bg-forest-50 active:scale-[0.98]"
        aria-label={label}
      >
        <Download size={16} />
        {label}
        <ChevronDown size={14} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-forest-100 bg-white py-1 shadow-lg">
          {options.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  opt.onClick();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-forest-700 transition hover:bg-forest-50"
              >
                <Icon size={16} className="text-forest-500" />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { FileText, FileSpreadsheet, Printer };
export default ExportMenu;

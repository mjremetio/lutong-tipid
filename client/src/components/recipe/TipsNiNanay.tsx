import type { FC } from 'react';

interface TipsNiNanayProps {
  tips: string[];
}

const TipsNiNanay: FC<TipsNiNanayProps> = ({ tips }) => {
  if (tips.length === 0) return null;

  return (
    <div className="rounded-xl bg-gold-50 border-l-4 border-gold-400 px-5 py-4">
      <h3 className="font-heading text-base font-bold text-gold-800 mb-3">
        Tips ni Nanay
      </h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-gold-500 flex-shrink-0">&#8226;</span>
            <span className="font-body text-sm text-gold-900 leading-relaxed">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsNiNanay;

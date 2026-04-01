import React from 'react';

type CoreStackItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type CoreStackTickerProps = {
  items: CoreStackItem[];
};

export default function CoreStackTicker({ items }: CoreStackTickerProps) {
  return (
    <div className="landing-showcase__ticker">
      <div className="landing-showcase__ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={`ticker-a-${item.label}-${index}`} className="landing-showcase__skill-item landing-showcase__skill-pill">
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

type CoreStackItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type CoreStackClusterProps = {
  items: CoreStackItem[];
};

export default function CoreStackCluster({ items }: CoreStackClusterProps) {
  return (
    <div className="landing-showcase__stack-cluster" aria-label="Core stack list">
      {items.map((item) => (
        <div
          key={item.label}
          className="landing-showcase__stack-chip landing-showcase__stack-chip--small"
          data-stack-id={item.id}
        >
          <span className="landing-showcase__stack-chip-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="landing-showcase__stack-chip-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

import React from 'react';

const Legend = () => {
  // Define the icons and their labels
  const legendItems = [
    { icon: '🟩', label: 'Default' },
    { icon: '💰', label: 'Award' },
    { icon: '📜', label: 'Contract' },
    { icon: '🟢', label: 'Active' },
    { icon: '🚫', label: 'Cancelled' },
    { icon: '❌', label: 'Unsuccessful' },
    { icon: '✅', label: 'Complete' },
    { icon: '✖️', label: 'Withdrawn' },
    { icon: '📝', label: 'Planned' },
    { icon: '🗂', label: 'Tender' },
    { icon: '📅', label: 'Planning' },
    { icon: '🏢', label: 'Organization' },
  ];

  return (
    <div className="legend">
      <h2>Legend</h2>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index}>
            <span className="legend-icon">{item.icon}</span>
            <span className="legend-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
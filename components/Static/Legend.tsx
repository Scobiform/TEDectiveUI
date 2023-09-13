import React, { useState } from 'react';
/* Config */
import { initialPhysics, initialVisuals } from './../config';

const Legend = () => {

    // State variable to store the visual parameters
  const [visuals, setVisuals] = useState(initialVisuals);

  // Define the icons and their labels
  const legendItems = [
    { icon: visuals.iconDefault, label: 'Default'},
    { icon: visuals.iconAward, label: 'Award'},
    { icon: visuals.iconContract, label: 'Contract'},
    { icon: visuals.iconActive, label: 'Active'},
    { icon: visuals.iconCancelled, label: 'Cancelled'},
    { icon: visuals.iconUnsuccessful, label: 'Unsuccessful'},
    { icon: visuals.iconComplete, label: 'Complete' },
    { icon: visuals.iconWithdrawn, label: 'Withdrawn'},
    { icon: visuals.iconPlanned, label: 'Planned'},
    { icon: visuals.iconTender, label: 'Tender' },
    { icon: visuals.iconPlanning, label: 'Planning'},
    { icon: visuals.iconOrganization, label: 'Organization'},
    { icon: visuals.iconOrganizationSupplier, label: 'Supplier' },
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
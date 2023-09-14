import React, { useState } from 'react';
/* Config */
import { initialPhysics, initialVisuals } from './../config';
/* Styles */
import styles from './static.module.css';

export interface LegendProps {
  visuals?: typeof initialVisuals;
  setVisuals?: any;
}

const Legend = ({visuals, setVisuals}: LegendProps) => {

  // State variable to store the visual parameters
  [visuals, setVisuals] = useState(initialVisuals);

  // State variable to store the legend visibility
  const [showLegend, setShowLegend] = useState(false); 

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

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  return (
    <>
      <button onClick={toggleLegend}>
        {showLegend ? 'ℹ️' : 'ℹ️'}
      </button>
      {showLegend && (
        <div className={styles.legend}>
          <h2>Legend</h2>
          <ul>
            {legendItems.map((item, index) => (
              <li key={index}>
                {item.icon} = {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Legend;
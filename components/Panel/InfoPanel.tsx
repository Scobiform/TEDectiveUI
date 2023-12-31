import React, { useState } from 'react';
/* Config */
import { initialPhysics, initialVisuals } from '../config';
/* Styles */
import styles from './infoPanel.module.css';

export interface InfoPanelProps {
  visuals?: typeof initialVisuals;
  setVisuals?: any;
  showInfoPanel?: boolean;
  setShowInfoPanel?: any;
}

/* The info panel is a component that displays general information about the Open Contracting Data Standard (OCDS) 
and the TEDective application. */
const InfoPanel = ({ visuals = initialVisuals, setVisuals, showInfoPanel, setShowInfoPanel }: InfoPanelProps) => {

  // Define the icons, labels, and descriptions
  const InfoPanelItems = [
    { icon: visuals!.iconAward, label: 'Award', description: 'Represents an award in the Open Contracting Data Standard (OCDS), typically associated with the process of awarding a contract to a supplier.'},
    { icon: visuals!.iconContract, label: 'Contract', description: 'Signifies a contract within OCDS, indicating a formal agreement between an organization (buyer) and a supplier for the provision of goods or services.'},
    { icon: visuals!.iconTender, label: 'Release', description: 'Denotes a tender process, which is the stage where organizations solicit bids or proposals from potential suppliers for a contract.' },
    { icon: visuals!.iconActive, label: 'Active', description: 'Refers to the status of a procurement process or contract that is currently ongoing or in progress.'},
    { icon: visuals!.iconCancelled, label: 'Cancelled', description: 'Indicates that a procurement process or contract has been terminated or canceled before reaching its intended conclusion.'},
    { icon: visuals!.iconUnsuccessful, label: 'Unsuccessful', description: 'Represents a procurement process that did not result in the awarding of a contract to any supplier.'},
    { icon: visuals!.iconComplete, label: 'Complete', description: 'Signifies that a procurement process or contract has successfully concluded, and all associated tasks and obligations have been fulfilled.' },
    { icon: visuals!.iconWithdrawn, label: 'Withdrawn', description: 'Indicates that a procurement process or contract has been withdrawn or discontinued before reaching completion.'},
    { icon: visuals!.iconPlanned, label: 'Planned', description: 'Represents the stage in OCDS where organizations outline their plans for future procurement activities.'},
    { icon: visuals!.iconPlanning, label: 'Planning', description: 'Denotes the planning phase of a procurement process, where organizations define their procurement requirements and timelines.'},
    { icon: visuals!.iconOrganization, label: 'Organization', description: 'Represents an organizational entity within OCDS, which can be a buyer or a supplier involved in procurement activities.'},
    { icon: visuals!.iconOrganizationSupplier, label: 'Supplier', description: 'Specifically refers to an organization that provides goods or services and participates in procurement processes as a potential contractor or supplier.' },
  ];

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  return (
    <>
      <button 
          onClick={toggleInfoPanel} 
          tabIndex={0} 
          aria-label='Show general information and InfoPanel (I)' 
          accessKey='I' 
          className='introStepInfo'>
        {showInfoPanel ? 'ℹ️' : 'ℹ️'}
      </button>
      {showInfoPanel && (
        <div className={styles.InfoPanel}>
          <h2>The Open Contracting Data Standard (OCDS)</h2>
          <p>The Open Contracting Data Standard (OCDS) is a global initiative aimed at increasing transparency and accountability in public procurement processes. It provides a structured framework for governments and organizations to publish procurement data in a consistent and machine-readable format. By adopting OCDS, entities can improve access to information, promote fair competition, and empower citizens and businesses to engage more effectively in the public procurement ecosystem.</p>
          <p>For more details, visit <a href="https://standard.open-contracting.org/latest/en/primer/what/" target="_blank" rel="noopener noreferrer">What is the OCDS and why use it?¶</a>.</p>
          <iframe 
            width="100%" 
            src="https://www.youtube.com/embed/ucPEID4DsyI" 
            title="Introduction to OCDS" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"> 
          </iframe>
          <h3>Legend</h3>
          <ul>
            {InfoPanelItems.map((item, index) => (
              <li key={index}>
                <h4>{item.icon}</h4>
                <p>
                  <b>
                    {item.label}
                  </b>
                  <br />
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          <h3>User Documentation</h3>
          <p>For more details on the user documentation, please visit <a href="https://tedective.org/" target="_blank" rel="noopener noreferrer">tedective.org</a>.</p>
          <h3>Developer Documentation</h3>
          <p>For more details on the developer documentation, please visit the <a href="https://git.fsfe.org/TEDective/ui" target="_blank" rel="noopener noreferrer">TEDectiveUI repository</a>.</p>
        </div>
      )}
    </>
  );
};

export default InfoPanel;

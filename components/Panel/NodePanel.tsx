'use client';
import { useEffect, useState } from "react";
import styles from './panels.module.css'
import IconSVG  from '../Static/IconSVG'
import DoughnutChart from '../Chart/DoughnutChart'
import { GraphData, NodeObject } from "react-force-graph-2d";

// Interface for node panel props
export interface NodePanelProps {
  previewNode: NodeObject | null | undefined;
  isOpen: boolean;
  setOpen: any;
}

// Doughnut chart mockup data
const doughnutData = {
  labels: ["Buyer", "Seller"],
  datasets: [{
      data: [900, 100],
      backgroundColor: [
        "rgba(63, 165, 53, 1)",
        "rgba(0, 106, 135, 1)",
      ],
      borderWidth: 0,
  }]
};

// NodePanel component with NodePanelProps **********************************************/
const NodePanel = ({previewNode, isOpen, setOpen}: NodePanelProps) => {
 
  // Toggle menu
  const toggleMenu = () => setOpen(!isOpen);

  // Convert node object to string
  const objectString = JSON.stringify(previewNode);

  // TODO: Build switch case for template display based on node type
  if(previewNode === null || previewNode === undefined)
  {
    return (
      <>
        <div className={styles.nodePanel}>
          <button
          onClick={toggleMenu}
          className={styles.nodePanelMenuButton}
          aria-label="Open node panel"
          tabIndex={0}
          >
          <IconSVG />
          </button>
          {isOpen && (
              <div>
              </div>
            )
          }
        </div>
      </>
    )
  } else {
    return (
      <>
      <div className={styles.nodePanel}>
          <button
          onClick={toggleMenu}
          className={styles.nodePanelMenuButton}
          >
          <IconSVG />
          </button>
          {isOpen && (
              <div className={styles.panelView}>
                <div className={styles.nodePanelContent}>
                  {/* Switch case for node type */}  
                  {renderContentBasedOnNodeType(previewNode)}

                  {/*objectString*/}

                  {/* <DoughnutChart data={doughnutData} /> */}
                </div>
              </div>
            )
          }
        </div>
        </>
    );
  }
};

export default NodePanel;

// Function to render content based on node type
function renderContentBasedOnNodeType(previewNode: any) {
  // TODO: Build switch case for template display based on node type
  // Make the detail view for each node type a component

  // Fetch award
  if(previewNode.awardID !== undefined && previewNode.value !== undefined){
    return <div> {/* FETCH AWARD */}
              <h2>💰 {previewNode.label}</h2>
              <p>{previewNode.value.amount} {previewNode.value.currency}</p>
              <button>{previewNode.id}</button>
           </div>;
  }

  // Fetch contract
  if(previewNode.tag !== undefined && previewNode.tag[1] === 'contract') {
    return <div> {/* FETCH CONTRACT */}
              <button>{previewNode.id}</button>
           </div>;
  }

  // Fetch tender
  if(previewNode.tag !== undefined ) {
    switch (previewNode.tag[0]) {
      case 'tender':
          return <div> 
                    {/* FETCH TENDER*/}
                    <button>{previewNode.id}</button>
                </div>;
          break;
      case 'planning':
          return <div> 
                    {/* FETCH PLANNING*/}
                    <button>{previewNode.id}</button>
                </div>;
          break;
    }
  }

  // Fetch organization
  // TODO: Make organizationDetails component
  if(previewNode.name !== undefined) {
    return <div> {/* FETCH ORGANIZATION*/}
              <h2>🏢 {previewNode.name}</h2>
              <p>ID: {previewNode.id}</p>
              <p>Legal Name: {previewNode.identifier.legalName}</p>
              <p>Country Code: {previewNode.address.countryCode}</p>
              <p>Locality: {previewNode.address.locality}</p>
              <p>Postal Code: {previewNode.address.postalCode}</p>
              <p>Region: {previewNode.address.region}</p>
              <p>Street Address: {previewNode.address.streetAddress}</p>
           </div>;
  }

  // Return content based on node status
  if(previewNode.status !== undefined)
  {
    switch (previewNode.status) {
      case 'active':
        return <div>
                  <h2>🟢 {previewNode.label}</h2>
                  <button>{previewNode.id}</button>
                </div>;
      case 'cancelled':
        return <div>Content for type 2</div>;
      case 'unsuccessful':
        return <div>
                  <h2>❌ {previewNode.label}</h2>
                  <button>{previewNode.id}</button>
               </div>;
      case 'complete':
        return <div>
                  <h2>✅ {previewNode.label}</h2>
                  <p>{previewNode.description}</p>
                  <button>{previewNode.id}</button>
               </div>;
      case 'withdrawn':
        return <div>Content for type 5</div>;
      case 'planned':
        return <div>
                  <h2>📝 {previewNode.label}</h2>
                  <p>{previewNode.description}</p>
                  <button>{previewNode.id}</button>
               </div>;      
      default:
        return <div>
          <h2>{previewNode.titla}</h2>
          <p>{previewNode.description}</p>
        </div>;
    }
  }
}

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
              <div className={styles.panelView}>
                <div className={styles.nodePanelContent}>               
                  {/* TODO: 
                    - Show loading spinner
                    - Show guided TOUR
                    - Show welcome message
                    - Show help message
                    - link docs
                  */}
                </div>
              </div>
            )
          }
        </div>
      </>
    )
  } else {
    return (
      <>
      {/* Award based organization view with switch for buyer / seller perspective */}
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
                  <h2>Award Title</h2>
                  <p>Award description - {previewNode.description}</p>
                                 
                  <h3>Contracts</h3>
                  <p>Array of contracts</p>
                  <ul>
                    <li>
                      contract.title
                      contract.value
                    </li>
                    <li>
                      contract.title
                      contract.value
                    </li>
                    <li>
                      contract.title
                      contract.value
                    </li>
                    <li>
                      contract.title
                      contract.value
                    </li>
                  </ul>

                  <h4>Suppliers</h4>
                  <p>Array of suppliers</p>
                  <ul>
                    <li>
                      <button>supplier.name</button>
                    </li>
                  </ul>

                  <h4>Parties</h4>
                  <p>Array of parties</p>
                  <ul>
                    <li>
                      <button>party.name</button>
                    </li>
                  </ul>

                  <h4>Tender</h4>
                  <button>tender.id</button>
                  <p>tender.title</p>
                  <p>tender.description</p>

                  <h4>Date:</h4>
                  <p>{previewNode.date}</p>
                  <h4>Open contracting data standard identifier:</h4>
                  <button>-{previewNode.ocid}-</button> 
                  <hr />
                  <h1>base.name</h1>
                  <p>base.id</p>
                  <p>base.description</p>
                  <p>base.address</p>
                  <p>base.contactPoint</p>
                  
                  <h3>Statistics</h3>
                  <p>Information about the base Organization based on the perspective Buyer / Seller</p>

                  <h3>Charts displaying organization statistics</h3>
                  <DoughnutChart data={doughnutData}/>
                  {objectString}
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

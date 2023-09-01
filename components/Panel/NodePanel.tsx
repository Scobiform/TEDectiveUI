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

                  {objectString}

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

function renderContentBasedOnNodeType(previewNode: any) {
  if(previewNode.tag !== undefined && previewNode.tag[1] === 'contract') {
    return <div> FETCH CONTRACT
              <h2>{previewNode.titla}</h2>
              <p>{previewNode.description}</p>
           </div>;
  }

  switch (previewNode.nodeType) {
    case 'type1':
      return <div>Content for type 1</div>;
    case 'type2':
      return <div>Content for type 2</div>;
    case 'type3':
      return <div>Content for type 3</div>;
    default:
      return <div>
        <h2>{previewNode.titla}</h2>
        <p>{previewNode.description}</p>
      </div>;
  }
}

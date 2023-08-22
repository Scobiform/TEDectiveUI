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

// Radar chart mockup data
const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};
// Bar chart mockup data
const barData = {
  labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  datasets: [{
      data: [70, 90, 44, 60, 83, 90, 100],
      label: "Accepted",
      borderColor: "#3cba9f",
      backgroundColor: "#71d1bd",
      borderWidth: 2
  }, {
      data: [10, 21, 60, 44, 17, 21, 17],
      label: "Pending",
      borderColor: "#ffa500",
      backgroundColor: "#ffc04d",
      borderWidth: 2
  }, {
      data: [6, 3, 2, 2, 7, 0, 16],
      label: "Rejected",
      borderColor: "#c45850",
      backgroundColor: "#d78f89",
      borderWidth: 2
  }
  ]
};
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
// Line chart mockup data
const lineChartData = {
  label: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55],
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

// NodePanel component with NodePanelProps **********************************************/
const NodePanel = ({previewNode, isOpen, setOpen}: NodePanelProps) => {
 
  const toggleMenu = () => setOpen(!isOpen);

  // Convert node object to string
  const objectString = JSON.stringify(previewNode);

  // UseEffect hook
  // https://legacy.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    const closeMenu = () => isOpen && setOpen(false);
  }, [isOpen]);

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

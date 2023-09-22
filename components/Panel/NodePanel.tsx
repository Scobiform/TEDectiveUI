'use client';
import { useCallback, useEffect, useState } from "react";
import styles from './panels.module.css'
import { NodeObject } from "react-force-graph-2d";

export interface NodePanelProps {
  previewNode: NodeObject | null | undefined;
  isOpen: boolean;
  setOpen: any;
  apiPath: string;
  setApiPath: any; 
}

const NodePanel = ({previewNode, isOpen, setOpen, apiPath, setApiPath}: NodePanelProps) => {
 
  // Toggle menu
  const toggleMenu = () => setOpen(!isOpen);

  // Convert node object to string
  const objectString = JSON.stringify(previewNode);

  const handleClick = useCallback(
    (apiPath: string) => {  
      setApiPath(apiPath);
    }
  , [setApiPath]);

  if(previewNode === null || previewNode === undefined)
  {
    return (
      <>
        <div className={styles.nodePanel}>
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
          {isOpen && (
              <div className={styles.panelView}>
                <div className={styles.nodePanelContent}>
                  {/* Switch case for node type */} 
                  {renderContentBasedOnNodeType(previewNode)}
                  
                  {previewNode.name !== undefined && (
                    <button onClick={() => handleClick(previewNode.id+'')} aria-label="Load organization graph">Load organization graph</button>
                  )}
                  {/*objectString*/}
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
  try {

    // Fetch award
    if(previewNode.awardID !== undefined){
      return <div> {/* FETCH AWARD */}
                <h2>💰 {previewNode.label}</h2>
                <p>{previewNode.value.amount.toLocaleString()} {previewNode.value.currency}</p>
            </div>;
    }

    // Fetch contract
    if(previewNode.tag !== undefined && previewNode.tag[1] === 'contract') {
      return <div> {/* FETCH CONTRACT */}
                <h2>📜 {previewNode.label}</h2>
            </div>;
    }

    // Fetch tender
    if(previewNode.tag !== undefined ) {
      switch (previewNode.tag[0]) {
        case 'tender':
            return <div> 
                      {/* FETCH TENDER*/}
                  </div>;
            break;
        case 'planning':
            return <div> 
                      {/* FETCH PLANNING*/}
                  </div>;
            break;
      }
    }

    // Fetch organization
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
                  </div>;
        case 'cancelled':
          return <div>Content for type 2</div>;
        case 'unsuccessful':
          return <div>
                    <h2>❌ {previewNode.label}</h2>
                </div>;
        case 'complete':
          return <div>
                    <h2>✅ {previewNode.label}</h2>
                    <p>{previewNode.description}</p>
                </div>;
        case 'withdrawn':
          return <div>Content for type 5</div>;
        case 'planned':
          return <div>
                    <h2>📝 {previewNode.label}</h2>
                    <p>{previewNode.description}</p>
                </div>;      
        default:
          return <div>
            <h2>{previewNode.titla}</h2>
            <p>{previewNode.description}</p>
          </div>;
      }
    }
  }
  catch (error) {
    //console.log(error);
  }
}

'use client';
import { useCallback, useEffect, useState } from "react";
import styles from './panels.module.css'
import { NodeObject } from "react-force-graph-2d";
import { initialPhysics, initialVisuals } from "./../config";

export interface NodePanelProps {
  previewNode: NodeObject | null | undefined;
  isOpen: boolean;
  setOpen: any;
  apiPath: string;
  setApiPath: any;
  visuals: typeof initialVisuals
  setVisuals: any
}

// Node panel component
// This component renders the node panel on the right side of the screen
// based on the currently selected node type in the graph.
const NodePanel = ({previewNode, isOpen, setOpen, apiPath, setApiPath,  visuals, setVisuals}: NodePanelProps) => {
 
  // Copy to clipboard state
  const [copySuccess, setCopySuccess] = useState(String);

  // Toggle menu
  const toggleMenu = () => setOpen(!isOpen);

  // Convert node object to string
  const objectString = JSON.stringify(previewNode);

  const handleClick = useCallback(
    (apiPath: string) => {  
      setApiPath(apiPath);
    }
  , [setApiPath]);

  const handleCopyClick = (previewNode: any) => {

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const urlToCopy = `${baseUrl}/${previewNode.id}`;
    
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => {
          setCopySuccess('');
        }, 1000);
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
        setCopySuccess('Copy failed');
      });
  };

  // Icons
  const icons = [
    visuals.iconActive,
    visuals.iconCancelled,
    visuals.iconComplete,
    visuals.iconUnsuccessful,
    visuals.iconWithdrawn,
    visuals.iconPlanned,
    visuals.iconTender,
    visuals.iconPlanning,
    visuals.iconAward,
    visuals.iconContract,
    visuals.iconOrganization,
    visuals.iconOrganizationSupplier
  ];

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
                  {renderContentBasedOnNodeType(previewNode, icons)}
                  
                  {previewNode.name !== undefined && (
                    <>
                      <button onClick={() => handleClick(previewNode.id+'')} 
                              aria-label="Load organization graph">Load organization graph
                      </button>
                      <button onClick={() => handleCopyClick(previewNode)} 
                              aria-label="Copy URL to clipboard">Copy to clipboard
                      </button>
                      {copySuccess && <div>{copySuccess}</div>}
                    </>
                  )}
                  {/* Uncomment this to get json object debug in the panel. Might move to app settings. */}
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

function renderContentBasedOnNodeType(previewNode: any, iconMappings: any) {
  try {
    if (previewNode.awardID !== undefined) {
      return renderAward(previewNode, iconMappings);
    }

    if (previewNode.tag !== undefined) {
      if (previewNode.tag[1] === 'contract') {
        return renderContract(previewNode, iconMappings);
      }

      switch (previewNode.tag[0]) {
        case 'tender':
          return renderTender(previewNode, iconMappings);
        case 'planning':
          return renderPlanning(previewNode, iconMappings);
        default:
          break;
      }
    }

    if (previewNode.name !== undefined) {
      return renderOrganization(previewNode, iconMappings);
    }

    if (previewNode.status !== undefined) {
      return renderNodeByStatus(previewNode, iconMappings);
    }

    return null; // Return null for unsupported node types
  } catch (error) {
    // Handle the error
    return null;
  }
}

function renderAward(previewNode: any, iconMappings: any) {
  return (
    <div>
      <h2>{iconMappings[8]} {previewNode.label}</h2>
      <p>{previewNode.value.amount.toLocaleString()} {previewNode.value.currency}</p>
    </div>
  );
}

function renderContract(previewNode: any, iconMappings: any) {
  return (
    <div>
      <h2>{iconMappings[9]} {previewNode.label}</h2>
    </div>
  );
}

function renderTender(previewNode: any, iconMappings: any) {
  return (
    <div>
      <h2>{iconMappings[6]} {previewNode.label}</h2>
    </div>
  );
}

function renderPlanning(previewNode: any, iconMappings: any) {
  return (
    <div>
      <h2>{iconMappings[7]} {previewNode.label}</h2>
    </div>
  );
}

function renderOrganization(previewNode: any, iconMappings: any) {
  return (
    <div>
      <h2>{iconMappings[10]} {previewNode.name}</h2>
      <p>ID: {previewNode.id}</p>
      <p>Legal Name: {previewNode.identifier.legalName}</p>
      <p>Country Code: {previewNode.address.countryCode}</p>
      <p>Locality: {previewNode.address.locality}</p>
      <p>Postal Code: {previewNode.address.postalCode}</p>
      <p>Region: {previewNode.address.region}</p>
      <p>Street Address: {previewNode.address.streetAddress}</p>
    </div>
  );
}

function convertSubmissionMethodDetails(submissionMethodDetails: string) {
  if(submissionMethodDetails.startsWith('https://')) {
    return submissionMethodDetails;
  }
  else
  {
    const urlToCopy = `https://${submissionMethodDetails}`;
    return urlToCopy;
  }
}

function renderNodeByStatus(previewNode: any, iconMappings: any) {
  switch (previewNode.status) {
    case 'active':
      return (
        <div>
          {previewNode.submissionMethodDetails !== undefined ? (
            <>
              <h2>{iconMappings[0]} {previewNode.label}</h2>
              <button aria-label="Go to submission details" 
                      onClick={() => window.open(convertSubmissionMethodDetails(previewNode.submissionMethodDetails), '_blank', 'noreferrer')}>
                Go to submission details
              </button>
            </>
          ) : (
            <h2>{iconMappings[0]} {previewNode.label}</h2>
          )}
        </div>
      );
    case 'cancelled':
      return <div>{iconMappings[1]} {previewNode.label}</div>;
    case 'unsuccessful':
      return (
        <div>
          <h2>{iconMappings[3]} {previewNode.label}</h2>
        </div>
      );
    case 'complete':
      return (
        <div>
          <h2>{iconMappings[2]} {previewNode.label}</h2>
          <p>{previewNode.description}</p>
        </div>
      );
    case 'withdrawn':
      return <div>{iconMappings[4]} {previewNode.label}</div>;
    case 'planned':
      return (
        <div>
          <h2>{iconMappings[5]} {previewNode.label}</h2>
          <p>{previewNode.description}</p>
        </div>
      );
    default:
      return (
        <div>
          <h2>{previewNode.titla}</h2>
          <p>{previewNode.description}</p>
        </div>
      );
  }
}

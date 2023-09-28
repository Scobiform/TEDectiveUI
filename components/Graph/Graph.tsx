'use client';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { GraphData, NodeObject, LinkObject,  } from 'force-graph'
import * as d3 from 'd3-force';
/* Use 2d graph */
import ForceGraph2D, { ForceGraphMethods, ForceGraphProps } from "react-force-graph-2d";
/* Components */
import NodePanel from '../../components/Panel/NodePanel';
import GUI from '../GUI/GUI';
/* Config */
import { initialPhysics, initialVisuals } from './../config';
/* Component styles */
import styles from './graph.module.css';
import { useWindowSize } from "@react-hook/window-size";
import ThemeSwitch from "../Static/ThemeSwitch";
import dynamic from "next/dynamic";
import Legend from "../Static/Legend";
import ChartJS from "../Chart/ChartJS";

export interface GraphProps {
  graphData: GraphData | undefined; 
  physics?: typeof initialPhysics;
  setPhysics?: any;
  visuals?: typeof initialVisuals;
  setVisuals?: any;
  previewNode?: NodeObject | null | undefined;
  setPreviewNode: any;
  isOpen?: boolean;
  setOpen: any;
  apiPath: string;
  setApiPath: any;
  firstDate?: Date;
  lastDate?: Date;
  statusCounts?: any;
  buyerCounts?: any;
  supplierCounts?: any;
  mergedGraphData?: any;
  showLegend?: boolean;
  setShowLegend?: any;
}

// Create a component that will render the graph
const Graph = ({graphData, physics, setPhysics, visuals, setVisuals,
  previewNode, setPreviewNode, isOpen, setOpen, apiPath, setApiPath, firstDate, lastDate, 
  statusCounts, buyerCounts, supplierCounts, mergedGraphData,
  showLegend, setShowLegend }: GraphProps) => {

  // Create a reference to the graph
  const fgRef = useRef();

  // Create a ref to store whether the zoom has been set
  const zoomHasBeenSet = useRef(false);

  // Get the window size
  const [width, height] = useWindowSize();
  
  // State variable to store the physics parameters
  [physics, setPhysics] = useState(initialPhysics);
  // State variable to store the visual parameters
  [visuals, setVisuals] = useState(initialVisuals);
  // State variable to store the node that is currently being previewed
  [previewNode, setPreviewNode] = useState<NodeObject | null | undefined>(null);
  // State variable to store whether the node panel is open or not
  [isOpen, setOpen] = useState(false);

   // Chart visibility
   const [chartVisible, setChartVisible] = useState(false);

   // Handle the toggle chart button click event
   const handleToggleChart = () => {
     setChartVisible(!chartVisible); // Toggle chart visibility
   };
   
  // Openstreetmap visibility
  const [nutsVisible, setNutsVisible] = useState(false);

  // Handle the toggle NUTS map button click event
  const handleToggleNuts = () => {
    setNutsVisible(!nutsVisible); // Toggle NUTS map visibility
  };

  // State variable to store wheter legend is visible or not
  [showLegend, setShowLegend] = useState(false);

  // Callback function that will be called when a node is clicked
  const handleClick = useCallback(
    (node: NodeObject) => {
      setPreviewNode(node);
      setOpen(true);
    },
    [setPreviewNode, setOpen]
  );

  // Handle nodeHover events
  const handleNodeHover = useCallback(
    (node: NodeObject | null) => {
      if (node) {
        //console.log(node);
      }
    }
  ,[]);

  // Handle nodeDrag events
  const handleNodeDrag = useCallback(
    (node: NodeObject | null) => {
      if (node) {
        //console.log(node);
      }
    }
  ,[]);

  // Handle linkClick events
  const handleLinkClick = useCallback(
    (link: LinkObject) => {
      //console.log(link);
      setOpen(false);
    }
  ,[setOpen]);

  const handleZoomIn = () => {
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;
    if (fgInstance) {
      // Increase the zoom level (adjust the scale factor as needed)
      fgInstance.zoom(1.2);
      // Set the camera position to (0, 0)
      fgInstance.centerAt(0, 0);
    }
  };

  const handleZoomOut = () => {
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;
    if (fgInstance) {
      // Decrease the zoom level (adjust the scale factor as needed)
      fgInstance.zoom(0.14);
      // Set the camera position to (0, 0)
      fgInstance.centerAt(0, 0);
    }
  };

  useEffect(() => {
    // Get the ForceGraph2D instance
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;
  
    if (!physics) {
      return; // Do nothing if physics is undefined
    }
  
    if (!visuals) {
      return; // Do nothing if visuals is undefined
    }

    // Check if the zoom has already been set
    if (!zoomHasBeenSet.current) {
      // Zoom out to the initial zoom level
      fgInstance.zoom(0.21, 7);
      zoomHasBeenSet.current = true; // Set a flag to indicate that zoom has been set
    }

    // Create a repulsion force to enforce a minimum distance between nodes
    const repulsionForce = d3
      .forceManyBody()
      .strength(physics.chargeStrength) // Adjust the repulsion strength as needed
      .distanceMin(visuals.nodeDistanceMin) // Set the minimum distance between nodes
      .distanceMax(visuals.nodeDistanceMax); // Set the maximum distance between nodes
  
    // Set the ForceGraph2D instance's d3Force
    fgInstance.d3Force('charge', repulsionForce); // Set the charge force with repulsion
    fgInstance.d3Force('center', d3.forceCenter(0, 0));
    fgInstance.d3Force('collide', d3.forceCollide(physics.collideRadius));
    fgInstance.d3Force('link', d3.forceLink().id((d: any) => d.id).distance(visuals.linkDistance));
    fgInstance.d3Force('x', d3.forceX(width / 2).strength(physics.xStrength));
    fgInstance.d3Force('y', d3.forceY(height / 2).strength(physics.yStrength));
  }, [physics, fgRef, width, height, visuals]);


  // Define an array of background colors corresponding to your icons
  const backgroundColors = ['green', 'red', 'green', 'red', 'black', 'white'];

  const getStatusChart = (statusCounts: any) => {
    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: 'Status Data',
          data: Object.values(statusCounts),
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    };
  };

  const NutsMap = useMemo(() => dynamic(
    () => import('../NutsMap/NutsMap'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

    // Function to format a date as "yyyy-mm-dd"
  function formatDate(date: Date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  // Define an object of icon mappings for the chart
  const iconMappings: Record<number, string> = {
    0: visuals.iconActive + " Active" || 'Active',
    1: visuals.iconCancelled + " Cancelled" || 'Cancelled',
    2: visuals.iconComplete + " Complete" || 'Complete',
    3: visuals.iconUnsuccessful + " Unsuccessful" || 'Unsuccessful',
    4: visuals.iconWithdrawn + " Withdrawn" || 'Withdrawn',
    5: visuals.iconPlanned + " Planned" || 'Planned',
  };

  // Return the ForceGraph2D
  return (
    <>
      <div className={styles.graphWrapper}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="label"
          nodeCanvasObject={(node, ctx, globalScale) => {
            // This section defines the node labels
            let label = visuals!.iconDefault;
            let fontSize = 10 * visuals!.nodeRel;
        
            switch (true) {
                case (node.awardID !== undefined):
                  if (node.value !== undefined && node.value !== null) {
                    const amount: any = node.value.amount;
                    const minFontSize = 14;
                    const maxFontSize = 210;
                    const linearThreshold = 100000000; // Values below this threshold will use linear scaling
                    const minAmount = 1; // Minimum value of amount
                    const maxAmount = 100000000000; // Maximum value of amount
                
                    if (amount < linearThreshold) {
                        // Linear scaling for values below 1 million
                        fontSize = minFontSize + ((amount - minAmount) / (linearThreshold - minAmount)) * (maxFontSize - minFontSize);
                    } else {
                        // Logarithmic scaling for values above or equal to threshold
                        fontSize = minFontSize + (Math.log(amount) / Math.log(maxAmount)) * (maxFontSize - minFontSize);
                    }
                
                    fontSize = fontSize * visuals!.nodeRel * visuals!.awardNodeSizeMult;
                
                    if (visuals!.drawAmountValues === true) {
                        label = visuals!.iconAward + ' ' + amount;
                    } else {
                        label = visuals!.iconAward;
                    }
                }
                
                    break;
        
                case (node.tag !== undefined && node.tag[1] === 'contract'):
                    label = visuals!.iconContract;
                    break;
        
                case (node.status !== undefined):
                    switch (node.status) {
                        case 'active':
                            label = visuals!.iconActive;
                            break;
                        case 'cancelled':
                            label = visuals!.iconCancelled;
                            break;
                        case 'unsuccessful':
                            label = visuals!.iconUnsuccessful;
                            break;
                        case 'complete':
                            label = visuals!.iconComplete;
                            break;
                        case 'withdrawn':
                            label = visuals!.iconWithdrawn;
                            break;
                        case 'planned':
                            label = visuals!.iconPlanned;
                            break;
                    }
                    break;
        
                case (node.tag !== undefined):
                    switch (node.tag[0]) {
                        case 'tender':
                            label = visuals!.iconTender;
                            break;
                        case 'planning':
                            label = visuals!.iconPlanning;
                            break;
                    }
                    break;
        
                case (node.name !== undefined):
                    if(node.roles !== undefined && node.roles.includes('buyer')){
                      label = visuals!.iconOrganization;
                    }
                    if(node.roles !== undefined && node.roles.includes('supplier')){
                      label = visuals!.iconOrganizationSupplier;
                    }
                    break;
            }
        
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;

            // Calculate the center coordinates of the node
            const centerX = node.x || 0;
            const centerY = node.y || 0;

            // Calculate the text position to center it on the node
            const textX = centerX - textWidth / 2;
            const textY = centerY - fontSize / 2;

            const bckgDimensions = [textWidth, fontSize].map(n => n); // some padding

            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            if(node.color !== undefined){
              ctx.fillStyle = node.color;
            } else {
              ctx.fillStyle = '#3fa535';
            }

            ctx.fillText(label, textX, textY);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            if (bckgDimensions) {
              const [width, height] = bckgDimensions;
          
              // Calculate the x and y positions based on the center of the text label
              const x = (node.x || 0) - width / 2;
              const y = (node.y || 0) - height / 2;
          
              ctx.fillRect(x, y, width, height);
            }
          }}
          onNodeClick={handleClick}
          onNodeHover={handleNodeHover}
          onNodeDrag={handleNodeDrag}
          nodeRelSize={visuals.nodeRel}
          nodeVal={(node) => (node.size * visuals!.awardNodeSizeMult || 1 )}
          onLinkClick={handleLinkClick}
          onDagError={() => console.log('dag error')}
          onEngineStop={() => console.log('engine stopped')}
          linkWidth={visuals.linkWidth}
          linkColor={() => visuals!.linkColor}
          linkCurvature={visuals.linkCurvature}
          linkVisibility={visuals.linkVisibility}
          nodeVisibility={visuals.nodeVisibility}
          linkDirectionalParticles={visuals.linkDirectionalParticles}
          linkDirectionalParticleWidth={visuals.linkDirectionalParticleWidth}
          linkPointerAreaPaint={(link, color, ctx) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 0;
          }}
          enableZoomInteraction={physics.enableZoomInteraction}
          enablePointerInteraction={physics.enablePointerInteraction}
          enableNodeDrag={physics.enableNodeDrag}
          enablePanInteraction={physics.enablePanInteraction}
          onBackgroundClick={() => {
            setOpen(false);
            setChartVisible(false);
            setShowLegend(false);
          }}
          onBackgroundRightClick={() => setOpen(false)}
          d3AlphaDecay={physics.alphaDecay}
          d3AlphaMin={physics.alphaMin}
          d3VelocityDecay={physics.velocityDecay}
          cooldownTime={Infinity}
          width={width}
          height={height}
        />
      </div>
      <div className={styles.interactionBar}>
        <div className={styles.actionButtons}>
          {/* NUTS component toggle */}
          <button onClick={handleToggleNuts} tabIndex={0} aria-label='Show organizations on openstreetmap (M)' accessKey="M">
            {nutsVisible ? '⬅️' : '📍'}
          </button>
          {/* Chart component toggle */}
          <button onClick={handleToggleChart} tabIndex={0} aria-label='Show organization details and statistics (C)' accessKey="C">
            📊
          </button>
          <Legend visuals={visuals} setVisuals={setVisuals} showLegend={showLegend} setShowLegend={setShowLegend} />
          <ThemeSwitch />
        </div>
        <div className={styles.zoomButtons}>
          {!nutsVisible && (
            <>
              <button onClick={handleZoomIn} aria-label="Zoom in (+)" accessKey="+">
                ➕
              </button>
              <button onClick={handleZoomOut} aria-label="Zoom out (-)" accessKey="-">
                ➖
              </button>
            </>
          )}
        </div>
      </div>
      <NodePanel previewNode={previewNode} isOpen={isOpen} setOpen={setOpen} apiPath={apiPath} setApiPath={setApiPath} visuals={visuals} setVisuals={setVisuals}/>
      <GUI physics={physics} setPhysics={setPhysics} visuals={visuals} setVisuals={setVisuals}/>
      {/* Conditionally render the chart based on chartVisible state */}
      {chartVisible && (
          <>
            <div className={styles.organizationDetails}>
              <div className={styles.gridContainer}>
                <div className={styles.label}>First release:</div>
                <div className={styles.value}>{firstDate ? formatDate(firstDate) : "No Date"}</div>
                
                <div className={styles.label}>Last release:</div>
                <div className={styles.value}>{lastDate ? formatDate(lastDate) : "No Date"}</div>
                
                <div className={styles.label}>Overall spent:</div>
                <div className={styles.value}>{buyerCounts.value.toLocaleString()}</div>
                
                <div className={styles.label}>Overall earned:</div>
                <div className={styles.value}>{supplierCounts.value.toLocaleString()}</div>
              
                <div className={styles.label}>Tender status:</div>
                <div className={styles.value}>
                  <ChartJS data={getStatusChart(statusCounts)} type="bar" iconMappings={iconMappings} />
                </div>
              </div>
            </div>
          </>
        )}
        {/* Conditionally render the NUTS map based on nutsVisible state */}
        {nutsVisible &&
          <NutsMap data={mergedGraphData.nodes} apiPath={apiPath} setApiPath={setApiPath}/>
        }
    </>
  );
};

export default Graph;
'use client';
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
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
}

// Create a component that will render the graph
const Graph = ({graphData, physics, setPhysics, visuals, setVisuals,
  previewNode, setPreviewNode, isOpen, setOpen, apiPath, setApiPath }: GraphProps) => {

  // Create a reference to the graph
  const fgRef = useRef();

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
    }
  };

  const handleZoomOut = () => {
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;
    if (fgInstance) {
      // Decrease the zoom level (adjust the scale factor as needed)
      fgInstance.zoom(0.14);
    }
  };

  useEffect(() => {

    // Get the ForceGraph2D instance
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;

    if (!physics ) {
      return; // Do nothing if physics is undefined
    }

    // Zoom out to the initial zoom level
    fgInstance.zoom(0.21, 7);


    // Set the ForceGraph2D instance's d3Force
    fgInstance.d3Force('charge', d3.forceManyBody().strength(physics.chargeStrength));
    fgInstance.d3Force('center', d3.forceCenter(0, 0));
    fgInstance.d3Force('collide', d3.forceCollide(physics.collideRadius));
    fgInstance.d3Force('link', d3.forceLink().id((d: any) => d.id).distance(physics.linkDistance));
    fgInstance.d3Force('x', d3.forceX(width / 2).strength(physics.xStrength));
    fgInstance.d3Force('y', d3.forceY(height / 2).strength(physics.yStrength));
  },[physics, fgRef, width, height]);
  
  // Return the ForceGraph2D
  return (
    <>
      <div className={styles.graphWrapper}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="label"
          nodeAutoColorBy="indexColor"
          nodeCanvasObject={(node, ctx, globalScale) => {

            // This section defines the node labels
            let label = '🟩';
            let fontSize = 10 * visuals!.nodeRel;
        
            switch (true) {
                case (node.awardID !== undefined):
                    label = '💰';
                    if (node.value !== undefined && node.value !== null) {
                        const amount = node.value.amount;
                        switch (true) {
                          case amount < 10:
                              fontSize = Math.floor(7 * visuals!.nodeRel * visuals!.awardNodeSizeMult);
                              break;
                          case amount < 100000:
                              fontSize = Math.floor(3.5 * visuals!.nodeRel * (amount / 10000 * visuals!.awardNodeSizeMult));
                              break;
                          case amount < 1000000:
                              fontSize = Math.floor(2.8 * visuals!.nodeRel * (amount / 100000 * visuals!.awardNodeSizeMult));
                              break;
                          case amount < 10000000:
                              fontSize = Math.floor(1.4 * visuals!.nodeRel * (amount / 100000 * visuals!.awardNodeSizeMult));
                              break;
                          case amount < 100000000:
                              fontSize = Math.floor(0.7 * visuals!.nodeRel * (amount / 1000000 * visuals!.awardNodeSizeMult));
                              break;
                          default:
                              fontSize = Math.floor(2.1 * visuals!.nodeRel * (amount / 1000000 * visuals!.awardNodeSizeMult * 2));
                              break;
                      }             
                    }
                    break;
        
                case (node.tag !== undefined && node.tag[1] === 'contract'):
                    label = '📜';
                    break;
        
                case (node.status !== undefined):
                    switch (node.status) {
                        case 'active':
                            label = '🟢';
                            break;
                        case 'cancelled':
                            label = '🚫';
                            break;
                        case 'unsuccessful':
                            label = '❌';
                            break;
                        case 'complete':
                            label = '✅';
                            break;
                        case 'withdrawn':
                            label = '✖️';
                            break;
                        case 'planned':
                            label = '📝';
                            break;
                    }
                    break;
        
                case (node.tag !== undefined):
                    switch (node.tag[0]) {
                        case 'tender':
                            label = '🗂';
                            break;
                        case 'planning':
                            label = '📅';
                            break;
                    }
                    break;
        
                case (node.name !== undefined):
                    label = '🏢';
                    break;
            }
        
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n); // some padding
        
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillStyle = node.color;
        
            ctx.fillText(label, node.x || 1, node.y || 1);
        
            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            if (bckgDimensions) {
              const [width, height] = bckgDimensions;
              ctx.fillRect(node.x || 1 - width / 2, node.y || 1 - height / 2, width, height);
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
          onBackgroundClick={() => setOpen(false)}
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
        <div className={styles.zoomButtons}>
          <button onClick={handleZoomIn}>
            ➕
            </button>
          <button onClick={handleZoomOut}>
            ➖
          </button>
        </div>
      </div>
      <NodePanel previewNode={previewNode} isOpen={isOpen} setOpen={setOpen} apiPath={apiPath} setApiPath={setApiPath}/>
      <GUI physics={physics} setPhysics={setPhysics} visuals={visuals} setVisuals={setVisuals}/>
    </>
  );
};

export default Graph;
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
  graphData: GraphData | null; 
  physics?: typeof initialPhysics;
  setPhysics?: any;
  visuals?: typeof initialVisuals;
  setVisuals?: any;
  previewNode?: NodeObject | null | undefined;
  setPreviewNode: any;
  isOpen?: boolean;
  setOpen: any;
}

// Create a component that will render the graph
const Graph = ({graphData, physics, setPhysics, visuals, setVisuals,
  previewNode, setPreviewNode, isOpen, setOpen }: GraphProps) => {
  
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

  useEffect(() => {

    if (!physics ) {
      return; // Do nothing if physics is undefined
    }

    // Get the ForceGraph2D instance
    const fgInstance = fgRef.current as unknown as ForceGraphMethods;

    // Set the ForceGraph2D instance's d3Force
    fgInstance.d3Force('charge', d3.forceManyBody().strength(physics.chargeStrength));
    fgInstance.d3Force('center', d3.forceCenter(width / 2, height / 2));
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
          //@ts-ignore
          graphData={graphData}
          nodeLabel="label"
          nodeAutoColorBy="indexColor"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.description || node.label || '❇';
            const fontSize = 14/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n); // some padding

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
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
          d3AlphaTarget={physics.alphaTarget}
          d3VelocityDecay={physics.velocityDecay}
          cooldownTime={Infinity}
          width={width}
          height={height}
        />
      </div>
      <NodePanel previewNode={previewNode} isOpen={isOpen} setOpen={setOpen}/>
      <GUI physics={physics} setPhysics={setPhysics} visuals={visuals} setVisuals={setVisuals}/>
    </>
  );
};

export default Graph;
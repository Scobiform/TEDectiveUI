'use client';
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { GraphData, NodeObject, LinkObject } from 'force-graph'
import * as d3 from 'd3-force';
/* Use 2d graph */
import ForceGraph2D, { ForceGraphMethods, ForceGraphProps } from "react-force-graph-2d";
/* Components */
import NodePanel from '../../components/Panel/NodePanel';
import GUI from '../GUI/GUI';
/* Config */
import { initialFilter, initialPhysics, initialVisuals } from './config'
/* Component styles */
import styles from './graph.module.css'
import { useWindowSize } from "@react-hook/window-size";

// Interface for graph data
export interface GraphProps {
  graphData: GraphData | null; 
  physics: typeof initialPhysics
  setPhysics: any
  visuals: typeof initialVisuals
  setVisuals: any
  previewNode: NodeObject | null | undefined;
  setPreviewNode: any;
  isOpen: boolean;
  setOpen: any;
}

// Create a component that will render the graph
const Graph = ({graphData, physics, setPhysics, visuals, setVisuals,
  previewNode, setPreviewNode, isOpen, setOpen }: GraphProps) => {
  
  const [width, height] = useWindowSize();
  
  // State variable to store the filter parameters
  [physics, setPhysics] = useState(initialPhysics);
  // State variable to store the visual parameters
  [visuals, setVisuals] = useState(initialVisuals);
  // State variable to store the node that is currently being previewed
  [previewNode, setPreviewNode] = useState<NodeObject | null | undefined>(null);
  // State variable to store whether the node panel is open or not
  [isOpen, setOpen] = useState(false);

  // Create a reference to the forceGraphMethods
  const fgRef = useRef();

  // Callback function that will be called when a node is clicked
  const handleClick = useCallback(
    (node: NodeObject) => {
      setPreviewNode(node);
      setOpen(true);
    },
    [isOpen]
  );
  //console.log(isOpen);

  // D3 simulation settings
  // https://github.com/d3/d3-force
  useEffect(() => {
    const simulation = d3.forceSimulation(graphData!.nodes)
    .force("center", d3.forceCenter())
    .alphaDecay(physics.alphaDecay)
    .alphaMin(physics.alphaMin)
    .velocityDecay(physics.velocityDecay)
    .force("Collide", d3.forceCollide().radius(visuals.nodeRel))
    .force("Charge", d3.forceManyBody().strength(physics.charge))
    .force("Radial", d3.forceRadial(10))
    ;
  }, [physics])

  // Return the ForceGraph2D
  return (
    <>
      <div className={styles.graphWrapper}>
        <ForceGraph2D
          ref={fgRef}
          //@ts-ignore
          graphData={graphData}
          nodeLabel="label"
          nodeAutoColorBy="label"
          onNodeClick={handleClick}
          nodeRelSize={visuals.nodeRel}
          nodeVal={(node) => (node.size * visuals.awardNodeSizeMult)}
          linkWidth={visuals.linkWidth}
          linkColor={() => visuals.linkColor}
          d3AlphaDecay={physics.alphaDecay}
          d3VelocityDecay={physics.velocityDecay}
          d3AlphaMin={physics.alphaMin}
          linkCurvature={visuals.linkCurvature}
          linkVisibility={visuals.linkVisibility}
          nodeVisibility={visuals.nodeVisibility}
          linkDirectionalParticles={visuals.linkDirectionalParticles}
          linkDirectionalParticleWidth={visuals.linkDirectionalParticleWidth}
          //@ts-ignore
          dagMode={physics.dagMode}
          enablePanInteraction={physics.enablePanInteraction}
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
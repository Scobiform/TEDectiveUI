// SPDX-FileCopyrightText: 2023 Free Software Foundation Europe <contact@fsfe.org>
//
// SPDX-License-Identifier: GPL-3.0-or-later

export const initialFilter = {
    dateRange: [NaN, NaN],
    minMaxYears: [NaN, NaN],
}
  
// For D3
// https://github.com/vasturiano/d3-force-3d
export const initialPhysics = {
  /*alpha is roughly analogous to temperature in simulated annealing. 
  It decreases over time as the simulation “cools down”. 
  When alpha reaches alphaMin, the simulation stops
  */

  /*The alpha decay rate determines how quickly the current alpha interpolates 
  towards the desired target alpha; since the default target alpha is zero, 
  by default this controls how quickly the simulation cools. 
  Higher decay rates cause the simulation to stabilize more quickly, 
  but risk getting stuck in a local minimum; lower values cause the simulation to take longer to run, 
  but typically converge on a better layout. To have the simulation run forever at the current alpha, 
  set the decay rate to zero; alternatively, set a target alpha greater than the minimum alpha.*/
  alphaDecay: 0.0042,
  alphaMin: 0,
  alphaTarget: 1,
  /* 
  If decay is specified, sets the velocity decay factor to the specified number in the range [0,1] 
  and returns this simulation. If decay is not specified, returns the current velocity decay factor, 
  which defaults to 0.4. The decay factor is akin to atmospheric friction; after the application 
  of any forces during a tick, each node’s velocity is multiplied by 1 - decay. 
  As with lowering the alpha decay rate, less velocity decay may converge on a better solution, 
  but risks numerical instabilities and oscillation.
  */
  velocityDecay: 0.042,
  stopAnimation: false,
  enablePanInteraction: true,
  enableZoomInteraction: true,
  enablePointerInteraction: true,
  enableNodeDrag: true,
  enableNavigationControls: true,
  /* sets the strength accessor to the specified number or function, re-evaluates the strength 
  accessor for each node, and returns this force. A positive value causes nodes to attract each other,
   similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge. The strength accessor is invoked for each node in the simulation, 
   being passed the node and its zero-based index. The resulting number is then stored internally, 
   such that the strength of each node is only recomputed when the force is initialized or 
   when this method is called with a new strength, and not on every application of the force. */
  chargeStrength: -700,
  enableGravity: true,
  gravityStrength: 0.1,
  enableCollision: true,
  collisionStrength: 20,
  collideRadius: 10,
  enableCentering: true,
  centeringStrength: 0.2,
  linkStrength: 0.3,
  linkDistance: 42,
  linkIts: 1,
  xStrength: 0.1,
  yStrength: 0.1,
}

// TODO: use node colors
export let initialVisuals = {
  // Node colors
  orgNodeColor: 'green.500',
  awardNodeColor: 'orange.500',
  tenderNodeColor: 'yellow.500',
  planningNodeColor: 'gray.500',
  labels: 2,
  nodeRel: 1.4,
  labelFontSize: 8,
  labelLength: 40,
  labelWordWrap: 25,
  labelLineSpace: 1,
  labelTextColor: 'black',
  awardNodeSizeMult: 0.7,
  nodeZoomSize: 1.2,
  orgNodeSize: 2,
  linkWidth: 0.14,
  linkDistance: 42,
  linkColor: '#3fa535',
  highlightAnim: true,
  highlightFade: 0.8,
  highlightLinkSize: 1.4,
  highlightNodeSize: 2.2,
  highlightLabelFontSize: 1.4,
  linkCurvature: 0,
  linkVisibility: true,
  nodeVisibility: true,
  nodeDistanceMin: 0.42,
  nodeDistanceMax: 70,
  nodeStrength: -100,
  linkDirectionalParticles: 0,
  linkDirectionalParticleWidth: 0.1,
  linkLineDash: 0,
  blendMode: 'normal',
  bodyImageUrl: '',
  opacity: 0.91,
  windowWidth: 640,
  windowHeight: 320,
  viewBOxWidth: '42vw',
  viewBoxHeight: '42vh',
}
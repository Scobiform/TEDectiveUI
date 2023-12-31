'use client'
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { initialPhysics, initialVisuals } from "./../config";
import React from "react";
import { Leva, useControls, useCreateStore, folder, LevaPanel, monitor, button } from "leva";
/* Styles */
import styles from './gui.module.css'
import CachedObjects from "../Cache/CachedObjects";

export interface GUIProps {
    physics: typeof initialPhysics
    setPhysics: any
    visuals: typeof initialVisuals
    setVisuals: any
}

/* The GUI component is used for the app settings */
// https://github.com/pmndrs/leva
const GUI = ({physics, setPhysics, visuals, setVisuals}: GUIProps) => {

    // State for window size
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // State to toggle CachedObjects component
    const [showCachedObjects, setShowCachedObjects] = useState(false);

    // Function to toggle the CachedObjects component
    const toggleCachedObjects = () => {
        setShowCachedObjects(!showCachedObjects);
    };

    // Callback to set physics
    const setPhysicsCallback = useCallback((val: any) => setPhysics(val), [setPhysics])

    // Callback to set visuals
    const setVisualsCallback = useCallback((val: any) => setVisuals(val), [setVisuals])

    // Physics GUI panel
/*     const physicsData = useControls('Physics', {
        alphaDecay: { value: physics.alphaDecay, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaDecay: v }) },
        alphaMin: { value: physics.alphaMin, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaMin: v }) },
        alphaTarget: { value: physics.alphaTarget, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaTarget: v }) },
        velocityDecay: { value: physics.velocityDecay, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, velocityDecay: v }) },
        chargeStrength: { value: physics.chargeStrength, min: -1000, max: 1000, onChange: (v) => setPhysicsCallback({ ...physics, chargeStrength: v }) },
        enableGravity: { value: physics.enableGravity, onChange: (v) => setPhysicsCallback({ ...physics, enableGravity: v }) },
        enableCollision: { value: physics.enableCollision, onChange: (v) => setPhysicsCallback({ ...physics, enableCollision: v }) },
        enableCentering: { value: physics.enableCentering, onChange: (v) => setPhysicsCallback({ ...physics, enableCentering: v }) },
        enablePanInteraction: { value: true, onChange: (v) => setPhysicsCallback({ ...physics, enablePanInteraction: v }) },
        enableZoomInteraction: { value: true, onChange: (v) => setPhysicsCallback({ ...physics, enableZoomInteraction: v }) },
        enablePointerInteraction: { value: true, onChange: (v) => setPhysicsCallback({ ...physics, enablePointerInteraction: v }) },
        enableNodeDrag: { value: true, onChange: (v) => setPhysicsCallback({ ...physics, enableNodeDrag: v }) },
        enableNavigationControls: { value: true, onChange: (v) => setPhysicsCallback({ ...physics, enableNavigationControls: v }) },
        },
        { collapsed: true},
        [physics]
    ); */

    // Visuals GUI panel
    const visualsStore = useCreateStore() ;
    const visualsData = useControls('Visuals', {
        nodeVisibility: { 
            value: visuals.nodeVisibility, 
            onChange: (v) => setVisualsCallback({ ...visuals, nodeVisibility: v }),
            label: 'Node visibility'
        },
        nodeRelSize: { 
            value: visuals.nodeRel, 
            min: 0, 
            max: 70, 
            onChange: (v) => setVisualsCallback({ ...visuals, nodeRel: v }),
            label: 'The relative size of a node'
        },
        awardSizeMultiplier: { 
            value: visuals.awardNodeSizeMult, 
            min: 0, 
            max: 70, 
            onChange: (v) => setVisualsCallback({ ...visuals, awardNodeSizeMult: v }), 
            label: 'The size of Award nodes'
        },
        drawAmountValues: { 
            value: visuals.drawAmountValues, 
            onChange: (v) => setVisualsCallback({ ...visuals, drawAmountValues: v }),
            label: 'Draw amount values'
        },
        // nodeDistanceMin: { value: visuals.nodeDistanceMin, min: 0, max: 420, onChange: (v) => setVisualsCallback({ ...visuals, nodeDistanceMin: v }) },
        // nodeDistanceMax: { value: visuals.nodeDistanceMax, min: 0, max: 420, onChange: (v) => setVisualsCallback({ ...visuals, nodeDistanceMax: v }) },
        linkVisibility: { 
            value: visuals.linkVisibility, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkVisibility: v }),
            label: 'Link visibility'
        },
        linkColor: { 
            value: visuals.linkColor, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkColor: v }),
            label: 'Link color'
        },
        linkWitdh: { 
            value: visuals.linkWidth, 
            min: 0.07, 
            max: 0.42, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkWidth: v }),
            label: 'Link width'
        },
        // linkDistance: { value: visuals.linkDistance, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkDistance: v }) },
        linkCurvature: { 
            value: visuals.linkCurvature, 
            min: 0, 
            max: 70, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkCurvature: v }),
            label: 'Link curvature'
        },
        linkDirectionalParticles: { 
            value: visuals.linkDirectionalParticles, 
            min: 0, 
            max: 70, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticles: v }),
            label: 'Link directional particles'
        },
        linkDirectionalParticleWidth: { 
            value: visuals.linkDirectionalParticleWidth, 
            min: 0, 
            max: 70, 
            onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticleWidth: v }),
            label: 'Link directional particle width'
        },
        // Icons 
        iconDefault: { 
            value: visuals.iconDefault, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconDefault: v }),
            label: 'Default icon'
        },
        iconAward: { 
            value: visuals.iconAward, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconAward: v }),
            label: 'Award icon'
        },
        iconContract: { 
            value: visuals.iconContract, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconContract: v }),
            label: 'Contract icon'
        },
        iconActive: { 
            value: visuals.iconActive, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconActive: v }),
            label: 'Active icon'
        },
        iconCancelled: { 
            value: visuals.iconCancelled, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconCancelled: v }),
            label: 'Cancelled icon'
        },
        iconUnsuccessful: { 
            value: visuals.iconUnsuccessful, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconUnsuccessful: v }),
            label: 'Unsuccessful icon'
        },
        iconComplete: { 
            value: visuals.iconComplete, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconComplete: v }),
            label: 'Complete icon'
        },
        iconWithdrawn: { 
            value: visuals.iconWithdrawn, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconWithdrawn: v }),
            label: 'Withdrawn icon'
        },
        iconPlanned: { 
            value: visuals.iconPlanned, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconPlanned: v }),
            label: 'Planned icon'
        },
        iconTender: { 
            value: visuals.iconTender, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconTender: v }),
            label: 'Tender icon'
        },
        iconPlanning: { 
            value: visuals.iconPlanning, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconPlanning: v }),
            label: 'Planning icon'
        },
        iconOrganization: { 
            value: visuals.iconOrganization, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconOrganization: v }),
            label: 'Organization icon'
        },
        iconOrganizationSupplier: { 
            value: visuals.iconOrganizationSupplier, 
            onChange: (v) => setVisualsCallback({ ...visuals, iconOrganizationSupplier: v }),
            label: 'Organization supplier icon'
        },
        },
        { collapsed: true},
        [visuals, visualsStore]
    );

    // Cache store
    const cacheStore = useCreateStore();
    const cacheData = useControls('Cache', {
        showCachedObjects: button(() => toggleCachedObjects()),
        },
        { collapsed: true},
        [showCachedObjects, cacheStore]
    );

    // **************************************************************************** //
    // Container resize
    const handleSize = () => {
        setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
        });
    };

    let newWidth = windowSize.width * 0.84 + 'px';
    let newHeight = windowSize.height  * 0.84 + 'px';

    useLayoutEffect(() => {
        handleSize()
        window.addEventListener('resize', handleSize);
    }, [])

    // Set new window width and height
    document.documentElement.style.setProperty('--windowWidth', newWidth);
    document.documentElement.style.setProperty('--windowHeight', newHeight);

    // Set extra window width and height
    document.documentElement.style.setProperty('--windowWidthExtra', windowSize.width + 'px');
    document.documentElement.style.setProperty('--windowHeightExtra', windowSize.height + 'px');
 
    // Set opacity
    document.documentElement.style.setProperty('--opacity', visuals.opacity.toString());

    // Set menu position
    document.documentElement.style.setProperty('--menuPositionX', visuals.menuPositionX + 'rem');

    // Set header height
    document.documentElement.style.setProperty('--menuPositionY', visuals.menuPositionY + 'rem');
    
    /* GUI Settings ******************************************************************/
    // GUI Theme Store
    const colorsStore = useCreateStore();
    const radiiStore = useCreateStore()
    const spaceStore = useCreateStore()
    const fontSizesStore = useCreateStore()
    const sizesStore = useCreateStore()
    const borderWidthsStore = useCreateStore()
    const fontWeightsStore = useCreateStore()

    const colors = useControls(
        {
        colors: folder({
            elevation1: 'var(--tertiary)',
            elevation2: 'none',
            elevation3: 'none',
            accent1: 'var(--secondary)',
            accent2: 'var(--secondary)',
            accent3: 'var(--primary)',
            highlight1: 'var(--primary)',
            highlight2: 'var(--primary)',
            highlight3: 'var(--primary)',
        }),
        },
        { store: colorsStore }
    );

    const radii = useControls(
        {
        radii: folder({
            xs: '1.4px',
            sm: '2.1px',
            lg: '4.2px',
        }),
        },
        { store: radiiStore }
    )

    const space = useControls(
        {
        space: folder({
            sm: '0',
            md: '2.8rem',
            rowGap: '0',
            colGap: '0.42rem',
        }),
        },
        { store: spaceStore }
    )

    const fontSizes = useControls(
        {
        fontSizes: folder({
            root: '0.7em',
        }),
        },
        { store: fontSizesStore }
    )

    const sizes = useControls(
        {
        sizes: folder({
            rootWidth: '',
            controlWidth: '',
            scrubberWidth: '1.4rem',
            scrubberHeight: '1.4rem',
            rowHeight: '1.4rem',
            folderHeight: '1.4rem',
            checkboxSize: '1.4rem',
            joystickWidth: '70px',
            joystickHeight: '70px',
            colorPickerWidth: '100%',
            colorPickerHeight: '42%',
            monitorHeight: '5.6rem',
            numberInputMinWidth: '4.2rem',
        }),
        },
        { store: sizesStore }
    )

    const borderWidths = useControls(
        {
        borderWidths: folder({
            root: '0px',
            input: '1px',
            focus: '1px',
            hover: '1px',
            active: '1px',
            folder: '1px',
        }),
        },
        { store: borderWidthsStore }
    )

    const fontWeights = useControls(
        {
        fontWeights: folder({
            label: { value: 'normal', options: ['bold', 'light'] },
            folder: { value: 'normal', options: ['bold', 'light'] },
            button: { value: 'normal', options: ['bold', 'light'] },
        }),
        },
        { store: fontWeightsStore }
    )

    // GUI Theme
    const theme = {
        colors,
        radii,
        space,
        fontSizes,
        sizes,
        borderWidths,
        fontWeights,  
    };

    // Return the GUI
    return (
        <>
            <div className={`introStepSettings ${styles.levaWrapper}`}>
                {/* Render the Leva GUI */}
                <Leva   theme={theme}
                        fill={true}  // default = false,  true makes the pane fill the parent dom node it's rendered in
                        flat={true}// default = false,  true removes border radius and shadow
                        oneLineLabels={true} // default = false, alternative layout for labels, with labels and fields on separate rows
                        collapsed={true} // default = false, when true the GUI is collpased
                        hidden={false} // default = false, when true the GUI is hidden
                        titleBar={true} // default = true, when false the title bar is hidden
                />
                {/* Render the CachedObjects component if showCachedObjects is true */}      
                {showCachedObjects &&
                    <>
                    <LevaPanel store={cacheStore} 
                               fill={true} 
                               titleBar={true} 
                    />  
                    <CachedObjects />
                    </>
                }
            </div>
        </>
    )
}

export default GUI
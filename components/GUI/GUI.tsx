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

const GUI = ({physics, setPhysics, visuals, setVisuals}: GUIProps) => {

    // State for window size
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // State to toggle CachedObjects component
    const [showCachedObjects, setShowCachedObjects] = useState(false); // State to toggle CachedObjects component

    // Function to toggle the CachedObjects component
    const toggleCachedObjects = () => {
        setShowCachedObjects(!showCachedObjects);
    };

    // Callback to set physics
    const setPhysicsCallback = useCallback((val: any) => setPhysics(val), [setPhysics])

    // Callback to set visuals
    const setVisualsCallback = useCallback((val: any) => setVisuals(val), [setVisuals])

    // Physics GUI panel
    const physicsData = useControls('Physics', {
        alphaDecay: { value: physics.alphaDecay, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaDecay: v }) },
        alphaMin: { value: physics.alphaMin, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaMin: v }) },
        alphaTarget: { value: physics.alphaTarget, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, alphaTarget: v }) },
        velocityDecay: { value: physics.velocityDecay, min: 0, max: 1, onChange: (v) => setPhysicsCallback({ ...physics, velocityDecay: v }) },
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
    );

    // Visuals GUI panel
    const visualsStore = useCreateStore() ;
    const visualsData = useControls('Visuals', {
        nodeVisibility: { value: visuals.nodeVisibility, onChange: (v) => setVisualsCallback({ ...visuals, nodeVisibility: v }) },
        nodeRelSize: { value: visuals.nodeRel, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, nodeRel: v }) },
        awardSizeMultiplier: { value: visuals.awardNodeSizeMult, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, awardNodeSizeMult: v }) },
        drawAmountValues: { value: visuals.drawAmountValues, onChange: (v) => setVisualsCallback({ ...visuals, drawAmountValues: v }) },
        nodeDistanceMin: { value: visuals.nodeDistanceMin, min: 0, max: 420, onChange: (v) => setVisualsCallback({ ...visuals, nodeDistanceMin: v }) },
        nodeDistanceMax: { value: visuals.nodeDistanceMax, min: 0, max: 420, onChange: (v) => setVisualsCallback({ ...visuals, nodeDistanceMax: v }) },
        linkVisibility: { value: visuals.linkVisibility, onChange: (v) => setVisualsCallback({ ...visuals, linkVisibility: v }) },
        linkColor: { value: visuals.linkColor, onChange: (v) => setVisualsCallback({ ...visuals, linkColor: v }) },
        linkWitdh: { value: visuals.linkWidth, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkWidth: v }) },
        linkDistance: { value: visuals.linkDistance, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkDistance: v }) },
        linkCurvature: { value: visuals.linkCurvature, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkCurvature: v }) },
        linkDirectionalParticles: { value: visuals.linkDirectionalParticles, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticles: v }) },
        linkDirectionalParticleWidth: { value: visuals.linkDirectionalParticleWidth, min: 0, max: 70, onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticleWidth: v }) },
        // Icons 
        iconDefault: { value: visuals.iconDefault, onChange: (v) => setVisualsCallback({ ...visuals, iconDefault: v }) },
        iconAward: { value: visuals.iconAward, onChange: (v) => setVisualsCallback({ ...visuals, iconAward: v }) },
        iconContract: { value: visuals.iconContract, onChange: (v) => setVisualsCallback({ ...visuals, iconContract: v }) },
        iconActive: { value: visuals.iconActive, onChange: (v) => setVisualsCallback({ ...visuals, iconActive: v }) },
        iconCancelled: { value: visuals.iconCancelled, onChange: (v) => setVisualsCallback({ ...visuals, iconCancelled: v }) },
        iconUnsuccessful: { value: visuals.iconUnsuccessful, onChange: (v) => setVisualsCallback({ ...visuals, iconUnsuccessful: v }) },
        iconComplete: { value: visuals.iconComplete, onChange: (v) => setVisualsCallback({ ...visuals, iconComplete: v }) },
        iconWithdrawn: { value: visuals.iconWithdrawn, onChange: (v) => setVisualsCallback({ ...visuals, iconWithdrawn: v }) },
        iconPlanned: { value: visuals.iconPlanned, onChange: (v) => setVisualsCallback({ ...visuals, iconPlanned: v }) },
        iconTender: { value: visuals.iconTender, onChange: (v) => setVisualsCallback({ ...visuals, iconTender: v }) },
        iconPlanning: { value: visuals.iconPlanning, onChange: (v) => setVisualsCallback({ ...visuals, iconPlanning: v }) },
        iconOrganization: { value: visuals.iconOrganization, onChange: (v) => setVisualsCallback({ ...visuals, iconOrganization: v }) },
        iconOrganizationSupplier: { value: visuals.iconOrganizationSupplier, onChange: (v) => setVisualsCallback({ ...visuals, iconOrganizationSupplier: v }) },
        // Menu
        menuPositionX: { value: visuals.menuPositionX, onChange: (v) => setVisualsCallback({ ...visuals, menuPositionX: v }) },
        headerHeight: { value: visuals.headerHeight, onChange: (v) => setVisualsCallback({ ...visuals, headerHeight: v }) },
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

    let newWidth = windowSize.width * 0.91 + 'px';
    let newHeight = windowSize.height  * 0.91 + 'px';

    useLayoutEffect(() => {
        handleSize()
        window.addEventListener('resize', handleSize);
    }, [])

    // Set new window width and height
    document.documentElement.style.setProperty('--windowWidth', newWidth);
    document.documentElement.style.setProperty('--windowHeight', newHeight);
 
    // Set opacity
    document.documentElement.style.setProperty('--opacity', visuals.opacity.toString());

    // Set menu position
    document.documentElement.style.setProperty('--menuPositionX', visuals.menuPositionX + 'rem');

    // Set header height
    document.documentElement.style.setProperty('--headerHeight', visuals.headerHeight + 'rem');
    
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
            colorPickerWidth: '2.8rem',
            colorPickerHeight: '2.8rem',
            monitorHeight: '5.6rem',
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
            <div className={styles.levaWrapper}>

                <Leva
                theme={theme}
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
                    <LevaPanel store={cacheStore} fill={true} titleBar={true} />  
                    <CachedObjects />
                    </>
                }
            </div>
            <div className={styles.settingsIcon}>
                ⚙️
            </div>
        </>
    )
}

export default GUI
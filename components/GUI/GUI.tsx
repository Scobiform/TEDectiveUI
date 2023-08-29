'use client'
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { initialPhysics, initialVisuals } from "./../config";
import React from "react";
import { Leva, useControls, useCreateStore, folder, LevaPanel, monitor, button } from "leva";
/* Styles */
import styles from './gui.module.css'

export interface GUIProps {
    physics: typeof initialPhysics
    setPhysics: any
    visuals: typeof initialVisuals
    setVisuals: any
}

const GUI = ({physics, setPhysics, visuals, setVisuals}: GUIProps) => {

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    
    // Callback to set physics
    const setPhysicsCallback = useCallback((val: any) => setPhysics(val), [setPhysics])

    // Callback to set visuals
    const setVisualsCallback = useCallback((val: any) => setVisuals(val), [setVisuals])

    // Physics GUI panel
    const physicsData = useControls('Physics', {
        alphaDecay: { value: physics.alphaDecay, min: 0, max: 1, step: 0.0001, onChange: (v) => setPhysicsCallback({ ...physics, alphaDecay: v }) },
        alphaMin: { value: physics.alphaMin, min: 0, max: 1, step: 0.0001, onChange: (v) => setPhysicsCallback({ ...physics, alphaMin: v }) },
        alphaTarget: { value: physics.alphaTarget, min: 0, max: 1, step: 0.0001, onChange: (v) => setPhysicsCallback({ ...physics, alphaTarget: v }) },
        velocityDecay: { value: physics.velocityDecay, min: 0, max: 1, step: 0.001, onChange: (v) => setPhysicsCallback({ ...physics, velocityDecay: v }) },
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
        nodeRelSize: { value: visuals.nodeRel, min: 0, max: 42, step: 0.1, onChange: (v) => setVisualsCallback({ ...visuals, nodeRel: v }) },
        awardSizeMultiplier: { value: visuals.awardNodeSizeMult, min: 0.01, max: 7, step: 0.01, onChange: (v) => setVisualsCallback({ ...visuals, awardNodeSizeMult: v }) },
        linkVisibility: { value: visuals.linkVisibility, onChange: (v) => setVisualsCallback({ ...visuals, linkVisibility: v }) },
        linkColor: { value: visuals.linkColor, onChange: (v) => setVisualsCallback({ ...visuals, linkColor: v }) },
        linkWitdh: { value: visuals.linkWidth, min: 0, max: 7, step: 0.1, onChange: (v) => setVisualsCallback({ ...visuals, linkWidth: v }) },
        linkCurvature: { value: visuals.linkCurvature, min: 0, max: 70, step: 0.1, onChange: (v) => setVisualsCallback({ ...visuals, linkCurvature: v }) },
        linkDirectionalParticles: { value: visuals.linkDirectionalParticles, min: 0, max: 14, step: 0.001, onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticles: v }) },
        linkDirectionalParticleWidth: { value: visuals.linkDirectionalParticleWidth, min: 0, max: 42, step: 0.01, onChange: (v) => setVisualsCallback({ ...visuals, linkDirectionalParticleWidth: v }) },
        opacity: { value: visuals.opacity, min: 0, max: 1, step: 0.01, onChange: (v) => setVisualsCallback({ ...visuals, opacity: v }) },
        },
        { collapsed: true},
        [visuals, visualsStore]
    );

    // **************************************************************************** //
    // Container resize
    // TODO: Make own component
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

    document.documentElement.style.setProperty('--windowWidth', newWidth);
    document.documentElement.style.setProperty('--windowHeight', newHeight);

    // TODO: Make use of css var variables for this region
    // T
    const guiPanel = Array.from(
        document.getElementsByClassName('leva-c-hBtFDW') as HTMLCollectionOf<HTMLElement>,
    );
    // leva-c-kWgxhW
    const guiPanel1 = Array.from(
        document.getElementsByClassName('leva-c-kWgxhW') as HTMLCollectionOf<HTMLElement>,
    );
    // leva-c-hwBXYF
    const guiPanel2 = Array.from(
        document.getElementsByClassName('leva-c-hwBXYF leva-c-hwBXYF-kbKHjH-mode-drag') as HTMLCollectionOf<HTMLElement>,
    );

    const guiTitleBar = Array.from(
        document.getElementsByClassName('leva-c-hwBXYF') as HTMLCollectionOf<HTMLElement>,
    );

    guiPanel2.forEach(gui => {
        gui.style.flexDirection = 'row-reverse';
    });

    guiTitleBar.forEach(gui => {
        gui.style.opacity = 'var(--opacity)';
    });

    guiPanel1.forEach(gui => {
        gui.style.fontFamily = 'var(--font-inter)';
        gui.style.overflowY = 'scroll';
        gui.style.maxHeight = newHeight;
    });
    
    // Set Opacity
    document.documentElement.style.setProperty('--opacity', visuals.opacity.toString());
    
    /* GUI COLORS ******************************************************************/
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
            sm: '4.2px',
            md: '7px',
            rowGap: '4.2px',
            colGap: '4.2px',
        }),
        },
        { store: spaceStore }
    )

    const fontSizes = useControls(
        {
        fontSizes: folder({
            root: '9.1px',
        }),
        },
        { store: fontSizesStore }
    )

    const sizes = useControls(
        {
        sizes: folder({
            rootWidth: '175px',
            controlWidth: '77px',
            scrubberWidth: '7px',
            scrubberHeight: '7px',
            rowHeight: '21px',
            folderHeight: '14px',
            checkboxSize: '14px',
            joystickWidth: '70px',
            joystickHeight: '70px',
            colorPickerWidth: '70px',
            colorPickerHeight: '70px',
            monitorHeight: '70px',
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
                oneLineLabels={false} // default = false, alternative layout for labels, with labels and fields on separate rows
                collapsed={true} // default = false, when true the GUI is collpased
                hidden={false} // default = false, when true the GUI is hidden
                titleBar={true} // default = true, when false the title bar is hidden
                />
                <LevaPanel store={visualsStore} fill={true} titleBar={true} />
            </div>
        </>
    )
}

export default GUI
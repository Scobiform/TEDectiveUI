import React, { useEffect, useRef, useState } from 'react';
import 'intro.js/introjs.css'
import { Steps, Hints } from 'intro.js-react';

// Intro.js steps - https://introjs.com/docs/
// Intro.js-react - React wrapper for Intro.js - https://github.com/HiDeoo/intro.js-react
const Intro = () => {

  const [enabled, setEnabled] = useState(false);

  const [firstTime, setFirstTime] = useState(true);

  // ToDo: Move array to config and output here in a loop
  const steps = [
    {
      element: ".introStepInfo",
      intro: "This is the current TEDective user interface prototype, where you can explore European public procurement data.",
      position: 'bottom',
      title: 'Welcome to TEDective!'
    },
    {
      element: ".introStepInfo",
      intro: "For a basic overview, click the info button. There you will get a basic introduction to the OCDS and the icons used in this app.",
      position: 'bottom',
      title: 'Open Contracting Data Standard'
    },
    {
      element: ".introStepInfo",
      intro: "  You can find the hyperlinks to the user and developer documentaion here, too. <a href='https://tedective.org' target='_blank'>tedective.org</a>",
      position: 'bottom',
      title: 'User and developer documentation'
    },
    {
        element: ".introStepSearch",
        intro: "Here you can search for an entity. Which might be a company or a government body. A buyer or a supplier.",
        position: 'bottom',
        title: 'Search for an entity'
    },
    {
        element: ".introStepGraph",
        intro: "This is the graph view. You can click on a node to see more information about it. You can drag a node to move it around. You can also drag the background to move the whole graph around. You can zoom in and out with the mouse wheel. If you click the background (empty space) you will likely close open panels.",
        position: 'bottom',
        title: 'Graph view'
    },
    {
        element: ".introStepMap",
        intro: "You can switch to map view here.",
        position: 'bottom',
        title: 'Map view'
    },
    {
        element: ".introStepStats",
        intro: "You can open the statistics panel here. It will show basic statistics about the currently loaded organization graph.",
        position: 'bottom',
        title: 'Statistics'
    },
    {
        element: ".introStepZoom",
        intro: "In the graph-view '+' will center the view and zoom in (helpful if your graph got lost somewhere). In map view it will zoom in.",
        position: 'bottom',
        title: 'Reset Zoom / center graph'
    },
    {
        element: ".introStepSettings",
        intro: "You will find some app settings here.",
        position: 'bottom',
        title: 'App Settings'
    }
  ];

  useEffect(() => {   
    // Wait 1.4 seconds before starting the intro
    if (firstTime){
      setTimeout(() => {
        setEnabled(true);
      }, 1400);
      setFirstTime(false);
    }
  } , [firstTime, setEnabled, setFirstTime]);

  return (
    <>
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={0}
        options={{
          showProgress: false,
          showBullets: false,
          exitOnOverlayClick: true,
          exitOnEsc: true,
          nextLabel: 'Next',
          prevLabel: 'Back',
          //skipLabel: 'Skip',
          doneLabel: 'Done',
          hideNext: false,
          hidePrev: true,
          tooltipPosition: 'auto',
          overlayOpacity: 0.8,
          disableInteraction: false,
          dontShowAgain: false,
          showStepNumbers: false,
          keyboardNavigation: true,
          showButtons: true,
        }}
        onStart={(targetElement) => {
          //console.log('start');
        }}
        onBeforeChange={(targetElement) => {
          //console.log('beforeChange', targetElement);
        }}
        onChange={(targetElement) => {
          //console.log('change', targetElement);
        }}
        onAfterChange={(targetElement) => {
          //console.log('afterChange', targetElement);
        }}
        onBeforeExit={(targetElement) => {
          //console.log('beforeExit', targetElement);
        }}
        onExit={(targetElement) => {
          //console.log('exit', targetElement);
          setEnabled(false);
        }}
        onPreventChange={(targetElement) => {
          //console.log('preventChange', targetElement);   
        }}
        onComplete={() => {
          //console.log('complete');
          setEnabled(false);
        }}
      />
    </>
  );
};

export default Intro;
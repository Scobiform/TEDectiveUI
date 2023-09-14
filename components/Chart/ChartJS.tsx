import React, { useEffect, useRef, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';
/* Config */
import { initialPhysics, initialVisuals } from './../config';

export interface ChartJSProps {
    type: any;
    data: any;
    visuals?: typeof initialVisuals;
    setVisuals?: any;
}

const ChartJS = ({data, type, visuals, setVisuals}: ChartJSProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // State variable to store the visual parameters
    [visuals, setVisuals] = useState(initialVisuals);

    useEffect(() => {
        
        // Get the canvas element and its context
        const canvas = canvasRef.current;

        if (!canvas) {
            return; // Exit the effect if canvas is null
        }

        if (!visuals) {
            return; // Exit the effect if visuals is null
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return; // Exit the effect if context is null
        }

        let myChart = new Chart(ctx, {
            // The type of chart we want to create
            type: type,
            // The data for our dataset
            data: data,
            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: false, // Use icons as legend points
                        },
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        ticks: {
                            callback: (value: any, index: number, values: any) => {
                              // Render the HTML labels with icons
                              switch(value) {
                                case 0:
                                    return visuals!.iconActive;
                                case 1:
                                    return visuals!.iconCancelled;
                                case 2:
                                    return visuals!.iconComplete;
                                case 3:
                                    return visuals!.iconUnsuccessful;
                                case 4:
                                    return visuals!.iconWithdrawn;
                                case 5:
                                    return visuals!.iconPlanned;
                                }
                            },
                        },
                    },
                    y: {
                        stacked: false,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });

        // Clean up by destroying the chart when the component unmounts
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data, type, visuals]);

    return (
        <>
            <div className={styles.barChart}>
                {/* Stacked chart */}
                <div className="">
                    <div className="">
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChartJS;
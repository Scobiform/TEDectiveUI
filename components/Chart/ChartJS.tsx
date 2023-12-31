import React, { useEffect, useRef, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';

export interface ChartJSProps {
    type: any;
    data: any;
    iconMappings: any;
}

// Generic ChartJS component
// https://www.chartjs.org/docs/latest/
const ChartJS = ({data, type, iconMappings}: ChartJSProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        
        // Get the canvas element and its context
        const canvas = canvasRef.current;

        if (!canvas) {
            return; // Exit the effect if canvas is null
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
                              return iconMappings[value] || value;
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
    }, [data, type, iconMappings]);

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
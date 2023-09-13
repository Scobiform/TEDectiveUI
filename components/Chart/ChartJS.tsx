import React, { useEffect, useRef } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';

// TODO: Make this a generic Chart.js component
const ChartJS = (props: any) => {
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
            type: props.type,
            // The data for our dataset
            data: props.data,
            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        ticks: {
                            display: false
                        }
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
    }, [props.data, props.type, props.labels]);

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
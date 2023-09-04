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
            type: 'doughnut',
            // The data for our dataset
            data: props.data,
        });

        // Clean up by destroying the chart when the component unmounts
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [props.data]); // Run this effect when props.data changes

    return (
        <div className={styles.doughnutChart}>
            {/* Stacked chart */}
            <div className="">
                <div className="">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
}

export default ChartJS;
import React, { useEffect, useRef } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';

const RadarChart = (props: any) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let radarChart: any = null;

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

        // Destroy the existing chart if it exists
        if (radarChart) {
            radarChart.destroy();
        }

        radarChart = new Chart(ctx, {
            type: 'line',
            data: props.data,
        });

        // Clean up by destroying the chart when the component unmounts
        return () => {
            if (radarChart) {
                radarChart.destroy();
            }
        };
    }, [props.data]); // Run this effect when props.data changes

    return (
        <div className={styles.lineChart}>
            {/* Stacked chart */}
            <div className="">
                <div className="">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
}

export default RadarChart;
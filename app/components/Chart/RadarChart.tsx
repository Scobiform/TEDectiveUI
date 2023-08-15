// https://www.chartjs.org/docs/latest/charts/radar.html

import { useEffect, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';

/****************************************************************************************/
// RadarChart component
// Show a radar chart with the given data
const RadarChart = (props: any) => {
    useEffect(() => {
        // @ts-ignore
        let ctx: any = document.getElementById('radarChart').getContext('2d');
        let myChart: any = new Chart(ctx, {
            type: 'radar',
            data: props.data,
            options: {
                elements: {
                line: {
                    borderWidth: 3
                }
                }
            },
        });
    }, [])

    return (
        <>
            <div className={styles.radarChart}>
                {/* Stacked chart */}
                <div className="">
                    <div className="">
                        <canvas id='radarChart'></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadarChart;
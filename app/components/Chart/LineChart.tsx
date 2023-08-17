import { useEffect, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import ts from "typescript";

const LineChart = (props: any) => {
    
    useEffect(() => {
        //@ts-ignore
        let ctx: any = document.getElementById('lineChart').getContext('2d');
        let myChart: any = new Chart(ctx, {
            type: 'line',
            data: props.data,
            options: {
                responsive: true,
            }
        });
    }, [])

    return (
        <>
            <div className={styles.lineChart}>
                {/* Stacked chart */}
                <div className="">
                    <div className="">
                        <canvas id='lineChart'></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart;
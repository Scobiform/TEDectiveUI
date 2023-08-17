import { useEffect, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';

const DoughnutChart = (props: any) => {

    useEffect(() => {
        //@ts-ignore
        let ctx: any = document.getElementById('doughnutChart').getContext('2d');
        let myChart: any = new Chart(ctx, {
            type: 'doughnut',
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
            <div className={styles.doughnutChart}>
                {/* Stacked chart */}
                <div className="">
                    <div className="">
                        <canvas id='doughnutChart'></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoughnutChart;
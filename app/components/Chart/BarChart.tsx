import { useEffect, useState } from "react";
import styles from './charts.module.css'
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

/****************************************************************************************/
// BarChart component

const BarChart = (props: any) => {  
    useEffect(() => {
        //@ts-ignore
        var ctx = document.getElementById('barChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
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
            <div className={styles.barChart}>
                {/* line chart */}
                <div className="">
                    <div className="">
                    <canvas id='barChart'></canvas>
                    </div>
                </div>
            </div>
        </>
      )
    }

export default BarChart;
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
/* components */
import ChartJS from "../Chart/ChartJS";
/* Config */
import { initialPhysics, initialVisuals } from './../config';
/* styles */
import styles from "./organization.module.css";

export interface OrganizationDetailsProps {
    visuals: typeof initialVisuals;
    firstDate?: Date;
    lastDate?: Date;
    statusCounts?: any;
    buyerCounts?: any;
    supplierCounts?: any;
    mergedGraphData?: any;
}

const OrganizationDetails = ({visuals, firstDate, lastDate, statusCounts, buyerCounts, supplierCounts, mergedGraphData}: OrganizationDetailsProps) => {

    // Define an array of background colors corresponding to your icons
    const backgroundColors = ['green', 'red', 'green', 'red', 'black', 'white'];

    // Define a function to return a chart object
    const getStatusChart = (statusCounts: any) => {
        return {
        labels: Object.keys(statusCounts),
        datasets: [
                {
                    label: 'Status Data',
                    data: Object.values(statusCounts),
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                },
            ],
        };
    };

    // Define an object of icon mappings for the chart
    const iconMappings: Record<number, string> = {
        0: visuals?.iconActive + " Active" || 'Active',
        1: visuals?.iconCancelled + " Cancelled" || 'Cancelled',
        2: visuals?.iconComplete + " Complete" || 'Complete',
        3: visuals?.iconUnsuccessful + " Unsuccessful" || 'Unsuccessful',
        4: visuals?.iconWithdrawn + " Withdrawn" || 'Withdrawn',
        5: visuals?.iconPlanned + " Planned" || 'Planned',
    };

    // Function to format a date as "yyyy-mm-dd"
    function formatDate(date: Date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    }

    // Return the component
    return (
        <div className={styles.organizationDetails}>
              <div className={styles.gridContainer}>
                <div className={styles.label}>First release:</div>
                <div className={styles.value}>{firstDate ? formatDate(firstDate) : "No Date"}</div>
                
                <div className={styles.label}>Last release:</div>
                <div className={styles.value}>{lastDate ? formatDate(lastDate) : "No Date"}</div>
                
                <div className={styles.label}>Overall spent:</div>
                <div className={styles.value}>{buyerCounts.value.toLocaleString()}</div>
                
                <div className={styles.label}>Overall earned:</div>
                <div className={styles.value}>{supplierCounts.value.toLocaleString()}</div>
              
                <div className={styles.label}>Tender status:</div>
                <div className={styles.value}>
                  {/* ChartJS generic component */}
                  <ChartJS 
                    data={getStatusChart(statusCounts)} 
                    type="bar" 
                    iconMappings={iconMappings} />
                </div>
              </div>
        </div>
    );
}

export default OrganizationDetails;

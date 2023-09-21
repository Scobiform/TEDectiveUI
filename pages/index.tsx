'use client'
import styles from '../styles/Home.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper';
import Search from '../components/Search/Search';
import LoadingSpinner from '../components/Static/LoadingSpinner';
import { useEffect, useMemo, useState } from 'react';
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d';
import ChartJS from "../components/Chart/ChartJS";
import dynamic from 'next/dynamic';
import IconSVG from '../components/Static/IconSVG';
import ThemeSwitch from '../components/Static/ThemeSwitch';

interface HomeProps {
  physics?: typeof initialPhysics;
  setPhysics: any;
  visuals?: typeof initialVisuals;
  setVisuals: any;
  previewNode?: NodeObject;
  setPreviewNode: any;
  isOpen?: boolean;
  setOpen: any;
  apiPath? : string;
  setApiPath: any;
}

type GraphData = {
  nodes: any[];
  links: any[];
};

const Home = ({apiPath, setApiPath, physics, setPhysics, visuals = initialVisuals, setVisuals, previewNode, 
              setPreviewNode, isOpen, setOpen 
            }: HomeProps) => {

  // API URL
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // Initial graph id
  const initialGraphId = process.env.NEXT_PUBLIC_INITIAL_GPAPH_ID;

  // Graph paths
  const buyerGraphPath = apiURL+'graph/releases/buyer/';
  const supplierGraphPath = apiURL+'graph/releases/supplier/';

  // API path state
  [apiPath, setApiPath] = useState(initialGraphId+'');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Chart visibility
  const [chartVisible, setChartVisible] = useState(false);

  // Handle the toggle chart button click event
  const handleToggleChart = () => {
    setChartVisible(!chartVisible); // Toggle chart visibility
  };

  // State for counts
  const [supplierCounts, setSupplierCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });
  const [buyerCounts, setBuyerCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });

  // State for status counts
  const [statusCounts, setStatusCounts] = useState({ active: 0, cancelled: 0, complete: 0, unsuccessful: 0, withdrawn: 0, planned: 0 });

  // Organization details visibility
  const [nutsVisible, setNutsVisible] = useState(false);

  // Handle the toggle NUTS map button click event
  const handleToggleNuts = () => {
    setNutsVisible(!nutsVisible); // Toggle NUTS map visibility
  };

  // Initialize firstDate and lastDate as null or default values
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);

  // State for graph data
  const [mergedGraphData, setMergedGraphData] = useState<GraphData>({ 
    nodes: [], 
    links: [] 
  });

  // Fetch graph data
  useEffect(() => {

    if(apiPath === undefined) {
      return;
    }

    setIsLoading(true); // Set loading to true before the fetch call

    try{
      // Fetch buyer data and supplier data in parallel
      Promise.all([
        fetch(buyerGraphPath + apiPath).then((response) => response.json()),
        fetch(supplierGraphPath + apiPath).then((response) => response.json()),
      ])
        .then(([buyerData, supplierData]) => {

          // Add the 'type' property to buyer nodes
          buyerData.nodes.forEach((node: { type: string }, index: number) => {
            if (index === 1) {
              node.type = 'baseOrganization';
            } else {
              node.type = 'buyer';
            }
          });

          // Add the 'type' property to supplier nodes
          supplierData.nodes.forEach((node: { type: string }, index: number) => {
            if (index === 1) {
              node.type = 'baseOrganization';
            } else {
              node.type = 'supplier';
            }
          });

          // Extract dates from both buyer and supplier nodes
          const allNodes = [...buyerData.nodes, ...supplierData.nodes];
          const allDates = allNodes.map((node) => node.date).filter(Boolean); // Filter out null or undefined dates

          // Find the first and last dates
          const sortedDates = allDates.sort();
          const first = sortedDates[0];
          const last = sortedDates[sortedDates.length - 1];

          // Set the firstDate and lastDate state variables
          setFirstDate(first);
          setLastDate(last);

          // Merge the nodes and links arrays from both graphs
          const mergedData = {
            nodes: [...buyerData.nodes, ...supplierData.nodes],
            links: [...buyerData.links, ...supplierData.links],
          };

          // Count contracts, tenders, and awards
          const supplierCounts = {
            contracts: 0,
            tenders: 0,
            awards: 0,
            value: 0,
          };

          const buyerCounts = {
            contracts: 0,
            tenders: 0,
            awards: 0,
            value: 0,
          };

          const statusCounts = {
            active: 0,
            cancelled: 0,
            complete: 0,
            unsuccessful: 0,
            withdrawn: 0,
            planned: 0,
          };

          supplierData.nodes.forEach((node: any) => {
            if (node.tag) {
              if (node.tag.includes('contract')) {
                supplierCounts.contracts++;
              }
              if (node.tag.includes('tender')) {
                supplierCounts.tenders++;
              }
              if (node.tag.includes('award')) {
                supplierCounts.awards++;
              }
            }
            if (node.value !== undefined && node.value !== null) {
              supplierCounts.value += node.value.amount;
            }
            if(node.status) {
              if(node.status.includes('active')) {
                statusCounts.active++;
              }
              if(node.status.includes('cancelled')) {
                statusCounts.cancelled++;
              }
              if(node.status.includes('complete')) {
                statusCounts.complete++;
              }
              if(node.status.includes('unsuccessful')) {
                statusCounts.unsuccessful++;
              }
              if(node.status.includes('withdrawn')) {
                statusCounts.withdrawn++;
              }
              if(node.status.includes('planned')) {
                statusCounts.planned++;
              }
            }
          });

          buyerData.nodes.forEach((node: any) => {
            if (node.tag) {
              if (node.tag.includes('contract')) {
                buyerCounts.contracts++;
              }
              if (node.tag.includes('tender')) {
                buyerCounts.tenders++;
              }
              if (node.tag.includes('award')) {
                buyerCounts.awards++;
              }
            }
            if (node.value !== undefined && node.value !== null) {
              buyerCounts.value += node.value.amount;
            }
            if(node.status) {
              if(node.status.includes('active')) {
                statusCounts.active++;
              }
              if(node.status.includes('cancelled')) {
                statusCounts.cancelled++;
              }
              if(node.status.includes('complete')) {
                statusCounts.complete++;
              }
              if(node.status.includes('unsuccessful')) {
                statusCounts.unsuccessful++;
              }
              if(node.status.includes('withdrawn')) {
                statusCounts.withdrawn++;
              }
              if(node.status.includes('planned')) {
                statusCounts.planned++;
              }
            }
          });

          setBuyerCounts(buyerCounts);
          setSupplierCounts(supplierCounts);
          setStatusCounts(statusCounts);

          setMergedGraphData(mergedData);
          setIsLoading(false);
        });
      }
      catch(error)
      {
        //
      }
  },[apiPath, buyerGraphPath, supplierGraphPath]);

  // Define an array of background colors corresponding to your icons
  const backgroundColors = ['green', 'red', 'green', 'red', 'black', 'white'];

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

  const NutsMap = useMemo(() => dynamic(
    () => import('./../components/NutsMap/NutsMap'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

    // Function to format a date as "yyyy-mm-dd"
  function formatDate(date: Date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  // Define an object of icon mappings for the chart
  const iconMappings: Record<number, string> = {
    0: visuals.iconActive || 'Active',
    1: visuals.iconCancelled || 'Cancelled',
    2: visuals.iconComplete || 'Complete',
    3: visuals.iconUnsuccessful || 'Unsuccessful',
    4: visuals.iconWithdrawn || 'Withdrawn',
    5: visuals.iconPlanned || 'Planned',
  };

  return (
    <>
      <main className={styles.main}>
        <Header />
        {/* The GraphWrapper */}
        <GraphWrapper 
          graphData={mergedGraphData} 
          physics={physics} 
          setPhysics={setPhysics} 
          visuals={visuals} 
          setVisuals={setVisuals} 
          isOpen={isOpen} 
          setOpen={setOpen} 
          previewNode={previewNode} 
          setPreviewNode={setPreviewNode}
          apiPath={apiPath}
          setApiPath={setApiPath}
        />
        {/* Loading spinner CSS in globals*/}
        {isLoading ? <LoadingSpinner /> : null}
        {/* The Search component */}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
        <button className={styles.tedectveLogo}>
              <IconSVG />
        </button>
        {/* Interaction bar - may convert to component */}
        <div className={styles.interactionBar}>
          <div className={styles.actionButtons}>
            {/* NUTS component toggle */}
            <button onClick={handleToggleNuts}>
              {nutsVisible ? '🔙' : '📍'}
            </button>
            {/* Chart component toggle */}
            <button onClick={handleToggleChart}>
              📊
            </button>
            <ThemeSwitch />
          </div>
        </div>
        {/* Conditionally render the chart based on chartVisible state */}
        {chartVisible && (
          <>
            <div className={styles.organizationDetails}>
              <div className={styles.gridContainer}>
                <div className={styles.label}>Organization:</div>
                <div className={styles.value}>{mergedGraphData.nodes[1]?.name || "N/A"}</div>

                <div className={styles.label}>Country:</div>
                <div className={styles.value}>{mergedGraphData.nodes[1]?.address?.countryCode || "N/A"}</div>

                <div className={styles.label}>City:</div>
                <div className={styles.value}>{mergedGraphData.nodes[1]?.address?.locality || "N/A"}</div>

                <div className={styles.label}>Postal code:</div>
                <div className={styles.value}>{mergedGraphData.nodes[1]?.address?.postalCode || "N/A"}</div>

                <div className={styles.label}>Street address:</div>
                <div className={styles.value}>{mergedGraphData.nodes[1]?.address?.streetAddress || "N/A"}</div>

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
                  <ChartJS data={getStatusChart(statusCounts)} type="bar" iconMappings={iconMappings} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Conditionally render the NUTS map based on nutsVisible state */}
        {nutsVisible &&
          <NutsMap data={mergedGraphData.nodes} apiPath={apiPath} setApiPath={setApiPath}/>
        }
      </main>
    </>
  )
}

export default Home;


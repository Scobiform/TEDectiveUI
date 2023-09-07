'use client'
import styles from '../styles/Home.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper';
import Search from '../components/Search/Search';
import LoadingSpinner from '../components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d';
import ChartJS from "../components/Chart/ChartJS";

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

const Home = ({apiPath, setApiPath, physics, setPhysics, visuals, setVisuals, previewNode, 
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

  const [supplierCounts, setSupplierCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });
  const [buyerCounts, setBuyerCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });

  // Organization details visibility
  const [organizationsVisible, setOrganizationsVisible] = useState(false);

  // Handle the toggle organization details button click event
  const handleToggleOrganizationDetails = () => {
    setOrganizationsVisible(!organizationsVisible); // Toggle chart visibility
  };

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
        });

        setBuyerCounts(buyerCounts);
        setSupplierCounts(supplierCounts);

        setMergedGraphData(mergedData);
        setIsLoading(false);
      });
  },[apiPath, buyerGraphPath, supplierGraphPath]);

  const getCombinedChart = (buyerContracts: any, buyerAwards: any, buyerTenders:any , supplierContracts: any, supplierAwards: any, supplierTenders: any) => {
    return {
      labels: ['Contracts', 'Awards', 'Tenders'],
      datasets: [
        {
          label: 'Buyer Data',
          data: [buyerContracts, buyerAwards, buyerTenders],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Buyer Contracts color
            'rgba(75, 192, 192, 0.5)', // Buyer Awards color
            'rgba(255, 205, 86, 0.5)', // Buyer Tenders color
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Supplier Data',
          data: [supplierContracts, supplierAwards, supplierTenders],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)', // Supplier Contracts color
            'rgba(255, 159, 64, 0.5)', // Supplier Awards color
            'rgba(153, 102, 255, 0.5)', // Supplier Tenders color
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
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
        <div className={styles.interactionBar}>
          <div className={styles.actionButtons}>
            <button onClick={handleToggleChart}>
              📊
            </button>
          </div>
        </div>
        {/* Conditionally render the chart based on chartVisible state */}
        {chartVisible && 
        <>
          <div className={styles.organizationDetails}>
            
          </div>
          <ChartJS data={getCombinedChart(
            buyerCounts.contracts, buyerCounts.awards, buyerCounts.tenders,
            supplierCounts.contracts, supplierCounts.awards, supplierCounts.tenders
            )} type="bar" 
          />
          <div className={styles.money}>
            <p>Overall spent: {buyerCounts.value}</p>
            <p>Overall earned: {supplierCounts.value}</p>
          </div>
        </>
        }
      </main>
    </>
  )
}

export default Home;


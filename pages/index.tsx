'use client'
import styles from '../styles/Home.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper';
import Search from '../components/Search/Search';
import LoadingSpinner from '../components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d';
import ChartJS from '../components/Chart/ChartJS';

interface HomeProps {
  physics?: typeof initialPhysics;
  setPhysics: any;
  visuals?: typeof initialVisuals;
  setVisuals: any;
  previewNode?: NodeObject;
  setPreviewNode: any;
  isOpen?: boolean;
  setOpen: any;
  apiPath?: string;
  setApiPath: any;
}

type GraphData = {
  nodes: any[]; // Replace 'any' with the actual type of your nodes
  links: any[]; // Replace 'any' with the actual type of your links
};

const Home = ({apiPath, 
              setApiPath, 
              physics, 
              setPhysics, 
              visuals, 
              setVisuals, 
              previewNode, 
              setPreviewNode, 
              isOpen, 
              setOpen 
            }: HomeProps) => {

  // API URL
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // API path state
  [apiPath, setApiPath] = useState('initial');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // State for graph data
  const [mergedGraphData, setMergedGraphData] = useState<GraphData>({ 
    nodes: [], 
    links: [] 
  }); // State for the merged graph
  const [buyerGraphData, setBuyerGraphData] = useState({
    nodes: [], 
    links: []
  }); // State for the buyer graph
  const [supplierGraphData, setsupplierGraphData] = useState({
    nodes: [], 
    links: []
  }); // State for the supplier graph

  // State for nodes count
  const [buyerNodesCount, setBuyerNodesCount] = useState(0);
  const [supplierNodesCount, setSupplierNodesCount] = useState(0);

  // Doughnut chart mockup data
  const doughnutData = {
    datasets: [{
        data: [buyerNodesCount, supplierNodesCount],
    }]
  };

  // State for cumulative amounts
  const [totalBuyerAmount, setTotalBuyerAmount] = useState(0);
  const [totalSupplierAmount, setTotalSupplierAmount] = useState(0);
  
  useEffect(() => {
    
    if(apiPath === undefined) {
      return;
    } 
    
    // Fetch data from API
    if (apiPath == 'initial') {
      setApiPath('https://api.tedective.org/latest/graph/releases/buyer/1778f0d1-545c-5fcb-bf80-7c0512bbd0be');
      return;
    }
  
    setIsLoading(true); // Set loading to true before the fetch call

    const buyerRegex = /(.+\/buyer\/)([a-f0-9-]+)/;
    
    // Use regex to extract the part of the URL up to "buyer" and the id
    const match = apiPath.match(buyerRegex);
    if (match) {
      const buyerPart = match[1]; // Extracted part of the URL
      const buyerId = match[2]; // Extracted id

      // Construct the supplierApiPath based on the extracted buyerPart
      const supplierApiPath = `${buyerPart.replace('/buyer/', '/supplier/')}${buyerId}`;

      // Fetch buyer data
      const buyerPromise = fetch(apiPath)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching buyer data:', error);
      });

      // Fetch supplier data
      const supplierPromise = fetch(supplierApiPath)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching supplier data:', error);
      });

      // Initialize variables to accumulate values for buyers and suppliers
      let totalBuyerAmount = 0;
      let totalSupplierAmount = 0;

      // Combine the data from both buyer and supplier promises
      Promise.all([buyerPromise, supplierPromise])
        .then(([buyerData, supplierData]) => {

          // Set the nodes count with 'awardID' field
          setBuyerNodesCount(buyerData.nodes.filter((node: { awardID?: any }) => node.awardID).length);
          setSupplierNodesCount(supplierData.nodes.filter((node: { awardID?: any }) => node.awardID).length);

          // Add the 'type' property to buyer nodes and set the 'ratio' property
          buyerData.nodes.forEach((node: { type: string, ratio: [number,number], value: { amount: number } }, index: number) => {
            if (index === 1) {
              node.type = 'baseOrganization';
              node.ratio = [buyerNodesCount, supplierNodesCount];
            } else {
              node.type = 'buyer';
            }
            if(node.value !== undefined && node.value !== null)
            {
                totalBuyerAmount += node.value.amount; // Accumulate buyer amounts
            }
          });

          // Add the 'type' property to supplier nodes
          supplierData.nodes.forEach((node: { type: string, ratio: [number,number], value: { amount: number } }, index: number) => {
            if (index === 1) {
              node.type = 'baseOrganization';
              node.ratio = [buyerNodesCount, supplierNodesCount];
            } else {
              node.type = 'supplier';
            }
            if(node.value !== undefined && node.value !== null)
            {
                totalSupplierAmount += node.value.amount; // Accumulate supplier amounts
            }
          });

          // Set the total amounts
          setTotalBuyerAmount(totalBuyerAmount);
          setTotalSupplierAmount(totalSupplierAmount);

          // Merge the nodes and links arrays from both graphs
          const mergedData = {
            nodes: [...buyerData.nodes, ...supplierData.nodes],
            links: [...buyerData.links, ...supplierData.links],
          };

          setMergedGraphData(mergedData);
          setIsLoading(false);
        });
    }
  },[apiPath, setApiPath, buyerNodesCount, supplierNodesCount]
  );

  return (
    <>
      <main className={styles.main}>
        <Header />
        {/* The GraphWrapper takes GraphData */}
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
        {isLoading ? <LoadingSpinner /> : 
          <p>TEDective makes European public procurement data explorable for non-experts</p>}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
        
        <div className={styles.statsBar}>
          <div className={styles.boughtSold}>
            <ul>
              <li>Bought: {totalBuyerAmount}</li>
              <li>Sold: {totalSupplierAmount}</li>
            </ul>
          </div>
          <ChartJS data={doughnutData} />
        </div>
      </main>
    </>
  )
}

export default Home;

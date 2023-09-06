'use client'
import styles from '../styles/Home.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper';
import Search from '../components/Search/Search';
import LoadingSpinner from '../components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d';

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

  // Initial graph id
  const initialGraphId = process.env.NEXT_PUBLIC_INITIAL_GPAPH_ID;

  // Graph paths
  const buyerGraphPath = apiURL+'graph/releases/buyer/';
  const supplierGraphPath = apiURL+'graph/releases/supplier/';

  // API path state
  [apiPath, setApiPath] = useState(initialGraphId+'');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

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

        setMergedGraphData(mergedData);
        setIsLoading(false);
      });
  },[apiPath, buyerGraphPath, supplierGraphPath]);

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
        {isLoading ? <LoadingSpinner /> : 
          <p>TEDective makes European public procurement data explorable for non-experts</p>}
        {/* The Search component */}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
      </main>
    </>
  )
}

export default Home;

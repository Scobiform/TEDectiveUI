'use client'
import styles from '../styles/Index.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper';
import Search from '../components/Search/Search';
import LoadingSpinner from '../components/Static/LoadingSpinner';
import { useEffect, useMemo, useState } from 'react';
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d';
import IconSVG from '../components/Static/IconSVG';

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

const Home = ({apiPath, setApiPath, physics, setPhysics, visuals = initialVisuals, setVisuals, 
    previewNode, setPreviewNode, isOpen, setOpen 
}: HomeProps) => {

  // Initial graph id
  const initialGraphId = process.env.NEXT_PUBLIC_INITIAL_GPAPH_ID;

  // API path state
  [apiPath, setApiPath] = useState(initialGraphId+'');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // State for counts
  const [supplierCounts, setSupplierCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });
  const [buyerCounts, setBuyerCounts] = useState({ contracts: 0, tenders: 0, awards: 0, value: 0 });

  // State for status counts
  const [statusCounts, setStatusCounts] = useState({ active: 0, cancelled: 0, complete: 0, unsuccessful: 0, withdrawn: 0, planned: 0 });

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

    const fetchData = async () => {
      try{
        // Fetch buyer data and supplier data in parallel
        const [graphResponse] = await Promise.all([
          fetch('/api/graph/?q=' + apiPath)
        ]);

        let graph = await graphResponse.json();

        let buyerData = graph.buyerData;
        let supplierData = graph.supplierData;

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
        }
        catch(error)
        {
          //
        }
      };
      fetchData();
  },[apiPath]);

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
          firstDate={firstDate || undefined}
          lastDate={lastDate || undefined}
          statusCounts={statusCounts}
          buyerCounts={buyerCounts}
          supplierCounts={supplierCounts}
          mergedGraphData={mergedGraphData}
        />
        {/* Loading spinner CSS in globals*/}
        {isLoading ? <LoadingSpinner /> : null}
        {/* The Search component */}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
        <div className={styles.tedectveLogo}>
              <IconSVG />
        </div>
      </main>
    </>
  )
}

export default Home;


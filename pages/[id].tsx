'use client'
import styles from '../styles/Index.module.css'
import Header from '../components/Static/Header';
import GraphWrapper from '../components/Graph/GraphWrapper'
import Search from '../components/Search/Search'
import LoadingSpinner from '../components/Static/LoadingSpinner'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { initialPhysics, initialVisuals } from '../components/config'
import { NodeObject } from 'react-force-graph-2d'
import IconSVG from '../components/Static/IconSVG'

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

    // Use router to get route
    const router = useRouter()
    const { id } = router.query

    // Set the initialGraphId to the id from the url
    const initialGraphId = id as string;

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

    // Set the apiPath to the id from the url
    useEffect(() => {
        if (id) {
            setApiPath(id as string);
        }
    }, [id, setApiPath]);

  // Fetch graph data
  useEffect(() => {

    if(apiPath === undefined) {
      return;
    }

    if( id === undefined) {
      return;
    }

    // Change route to the apiPath
    window.history.pushState({}, '', apiPath);

    // Set loading to true before the fetch call to show the loading spinner
    setIsLoading(true);

    const fetchData = async () => {
      try {

        // Fetch graph data
        const [graphResponse] = await Promise.all([fetch(`/api/graph/?q=${apiPath}`)]);
        const graph = await graphResponse.json();
        const { buyerData, supplierData } = graph;
    
        // Set node types
        const setNodeTypes = (nodes: any[], type: string) => {
          nodes.forEach((node, index) => {
            node.type = index === 1 ? 'baseOrganization' : type;
          });
        };
    
        // Add counts
        const addTagCounts = (nodes: any[], counts: any) => {
          nodes.forEach((node) => {
            if (node.tag) {
              if (node.tag.includes('contract')) counts.contracts++;
              if (node.tag.includes('tender')) counts.tenders++;
              if (node.tag.includes('award')) counts.awards++;
            }
          });
        };
    
        // Add value counts
        const addValueCounts = (nodes: any[], counts: any) => {
          nodes.forEach((node) => {
            if (node.value !== undefined && node.value !== null) {
              counts.value += node.value.amount;
            }
          });
        };
    
        // Add status counts
        const addStatusCounts = (nodes: any[], counts: any) => {
          nodes.forEach((node) => {
            if (node.status) {
              if (node.status.includes('active')) counts.active++;
              if (node.status.includes('cancelled')) counts.cancelled++;
              if (node.status.includes('complete')) counts.complete++;
              if (node.status.includes('unsuccessful')) counts.unsuccessful++;
              if (node.status.includes('withdrawn')) counts.withdrawn++;
              if (node.status.includes('planned')) counts.planned++;
            }
          });
        };
    
        // Set node types
        setNodeTypes(buyerData.nodes, 'buyer');
        setNodeTypes(supplierData.nodes, 'supplier');
    
        // Merge the nodes and links
        const allNodes = [...buyerData.nodes, ...supplierData.nodes];
        // Get all the dates
        const allDates = allNodes.map((node) => node.date).filter(Boolean);
        // Sort the dates
        const sortedDates = allDates.sort();
        // Get the first and last dates
        const first = sortedDates[0];
        const last = sortedDates[sortedDates.length - 1];
    
        // Set the first and last dates
        setFirstDate(first);
        setLastDate(last);
    
        // Merge the data
        const mergedData = {
          nodes: [...buyerData.nodes, ...supplierData.nodes],
          links: [...buyerData.links, ...supplierData.links],
        };
    
        // Set the counts
        const supplierCounts = { contracts: 0, tenders: 0, awards: 0, value: 0 };
        const buyerCounts = { contracts: 0, tenders: 0, awards: 0, value: 0 };
        const statusCounts = { active: 0, cancelled: 0, complete: 0, unsuccessful: 0, withdrawn: 0, planned: 0 };
    
        // Add counts
        addTagCounts(supplierData.nodes, supplierCounts);
        addValueCounts(supplierData.nodes, supplierCounts);
        addStatusCounts(supplierData.nodes, statusCounts);
    
        addTagCounts(buyerData.nodes, buyerCounts);
        addValueCounts(buyerData.nodes, buyerCounts);
        addStatusCounts(buyerData.nodes, statusCounts);
    
        setBuyerCounts(buyerCounts);
        setSupplierCounts(supplierCounts);
        setStatusCounts(statusCounts);
    
        // Set the merged data
        setMergedGraphData(mergedData);
        setIsLoading(false);

        // Set the apiPath in Home component
        setApiPath(apiPath);
        
      } catch (error) {
        // Handle the error
      }
    };
    fetchData();
  },[apiPath, setApiPath, id]);

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


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
  apiPath?: string;
  setApiPath: any;
}

function genRandomTree(N = 420, reverse = false) {
  const nodes = Array.from({ length: N }, (_, i) => ({ id: i }));
  
  const links = Array.from({ length: N - 1 }, (_, id) => ({
    [reverse ? 'target' : 'source']: id + 1,
    [reverse ? 'source' : 'target']: Math.round(Math.random() * id)
  }));
  
  // Convert the links to a format compatible with React Force Graph
  const formattedLinks = links.map(link => ({
    source: nodes[link.source],
    target: nodes[link.target]
  }));
  
  return { nodes, links: formattedLinks };
}

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
  [apiPath, setApiPath] = useState('random');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // State for graph data
  const [graphData, setGraphData] = useState({
    nodes: [], 
    links: []
  });
  
  useEffect(() => {
    // Generate random number
    const randomNumber = Math.floor(Math.random() * 420);
    // Generate random tree for testing
    const randomTree = genRandomTree(randomNumber, true);
    // If apiPath is 'random', set graphData to randomTree
    if (apiPath == 'random') {
      //@ts-ignore -- debug
      setGraphData(randomTree);
      setIsLoading(false);
      return;
    }
    fetch(apiPath+'')
      .then(response => response.json())
      .then(data => {
        setGraphData(data);
        setIsLoading(false);
        }
      );
    },[apiPath]
  );

  return (
    <>
      <main className={styles.main}>
        <Header />
        {/* The GraphWrapper takes GraphData */}
        <GraphWrapper 
          graphData={graphData} 
          physics={physics} 
          setPhysics={setPhysics} 
          visuals={visuals} 
          setVisuals={setVisuals} 
          isOpen={isOpen} 
          setOpen={setOpen} 
          previewNode={previewNode} 
          setPreviewNode={setPreviewNode}
        />
        {/* Loading spinner CSS in globals*/}
        {isLoading ? <LoadingSpinner /> : 
          <p>TEDective makes European public procurement data explorable for non-experts</p>}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
      </main>
    </>
  )
}

export default Home;

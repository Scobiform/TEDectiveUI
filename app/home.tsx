'use client'
import styles from './page.module.css'
import Header from './components/Static/Header';
import GraphWrapper from './components/Graph/GraphWrapper';
import Search from './components/Search/Search';
import LoadingSpinner from './components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';
import { initialFilter, initialPhysics, initialVisuals } from './config'
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
  [apiPath, setApiPath] = useState('initial.json');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fetch json from API
  const [graphData, setGraphData] = useState({nodes: [], links: []});
  useEffect(() => {
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

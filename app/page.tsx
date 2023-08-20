'use client'
import styles from './page.module.css'
import Header from './components/Static/Header';
import GraphWrapper from './components/Graph/GraphWrapper';
import Search from './components/Search/Search';
import LoadingSpinner from './components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';

interface PageProps {
  apiPath: string;
  setApiPath: any;
}

const Page = ({apiPath, setApiPath}: PageProps) => {

  // API path state
  [apiPath, setApiPath] = useState('blocks.json');

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
      <Header />
      <main className={styles.main}>
        {/* The GraphWrapper takes GraphData 
        @ts-ignore                           */}
        <GraphWrapper graphData={graphData} />
        {/* Loading spinner CSS in globals*/}
        {isLoading ? <LoadingSpinner /> : 
          <p>TEDective makes European public procurement data explorable for non-experts</p>}
        <Search apiPath={apiPath} setApiPath={setApiPath}/>
      </main>
    </>
  )
}

export default Page;

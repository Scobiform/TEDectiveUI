'use client'
import styles from './page.module.css'
import Header from './components/Static/Header';
import GraphWrapper from './components/Graph/GraphWrapper';
import Search from './components/Search/Search';
import LoadingSpinner from './components/Static/LoadingSpinner';
import { useEffect, useState } from 'react';

export interface HomeProps {
  id: string;
  setId: any;
  apiPath: string;
  setApiPath: any;
}

const Home = ({id, setId, apiPath, setApiPath}: HomeProps) => {

  // id use state for search
  [id, setId] = useState('initial.json');

  // apiPath
  [apiPath, setApiPath] = useState('/latest/graphql/');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  let apiUrl = 'initial.json';
  console.log(id);

  // Fetch json from API
  const [graphData, setGraphData] = useState({nodes: [], links: []});
  useEffect(() => {
    if(id !== 'initial.json') {
      apiUrl = `${apiPath}${id}`;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setGraphData(data);
        setIsLoading(false);
        }
      );
    },[id]
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
        <Search id={id} setId={setId} apiPath={apiPath} setApiPath={setApiPath}/>
      </main>
    </>
  )
}

export default Home;

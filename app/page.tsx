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
}

const Home = ({id, setId}: HomeProps) => {

  // id use state
  [id, setId] = useState('initial.json');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Releases per Buyer Graph
  //let apiUrl = '/latest/graphql/releases_per_buyer/1623e936-cdd6-522e-a5ed-54bce68301f2';
  // Awards per Organization Graph
  //let apiUrl = '/latest/graphql/award_per_org/f7fef1d1-8088-59d0-baf1-2afa825458ad';
  let apiUrl = 'initial.json';
  console.log(id);

  // Fetch json from API
  const [graphData, setGraphData] = useState({nodes: [], links: []});
  useEffect(() => {
    fetch(id)
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
        <Search id={id} setId={setId}/>
      </main>
    </>
  )
}

export default Home;

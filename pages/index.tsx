'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {

  const router = useRouter();

  // Initial graph id
  const initialGraphId = process.env.NEXT_PUBLIC_INITIAL_GPAPH_ID;

  useEffect(() => {
    // Redirect to a dynamic route with the 'id' parameter
    router.push('/'+initialGraphId);
  }, [initialGraphId, router]);

}

export default Home;


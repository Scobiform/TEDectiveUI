import dynamic from "next/dynamic";

// Loads the graph component dynamically without server-side-rendering (SSR)
// https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering
const GraphWrapper = dynamic(() => import("./Graph"), {
  ssr: false
});

export default GraphWrapper;
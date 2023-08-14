import { useEffect, useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";

import Graph from "../components/Graph";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load the JSON data from the public folder
    fetch("/graph.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching the graph data:", error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>agbenchmark</title>
        <meta
          name="description"
          content="The best way to evaluate your agents"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        {data && <Graph graphData={data} />}
      </main>
    </>
  );
};

export default Home;

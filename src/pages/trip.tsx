import Head from "next/head";

import { MapC as Map, MapSidebar } from "@/components";

const trip = () => {
  return (
    <>
      <Head>
        <title>Trip | App Name</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <MapSidebar />
        <Map />
      </main>
    </>
  );
};

export default trip;

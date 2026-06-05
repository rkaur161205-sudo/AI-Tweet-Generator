import Head from "next/head";
import { Inter } from "next/font/google";
import Tweetboard from "@/components/tweetBoard";
import Threadboard from "@/components/threadBoard";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [thread, setThread] = useState(false);
  return (
    <>
      <Head>
        <title>AI Tweet Generator</title>
        <meta name="description" content="This is an AI powered Tweet Generator made by Shivam." />
        <meta property="og:title" content="AI Tweet Generator"/>
        <meta property="og:image" content="/twitter-logo.png"/>
        <meta property="og:description" content="This is an AI powered Tweet Generator made by Shivam."/>
        <meta property="og:url" content="ai-tweet-generator-shivamagr1812.vercel.app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-white min-h-screen p-5"}>
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">
            AI Tweet Generator
            <span className="text-4xl md:text-6xl font-bold text-blue-600">
              .
            </span>
          </h1>
          <p className="mt-3 text-2xl">
            Create Amazing
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              {thread?"Threads":"Tweets"}{" "}
            </span>
            in Seconds
          </p>
        </div>
        {thread? <Threadboard/>: <Tweetboard/>}
        <div className="flex flex-col font-medium text-lg justify-center">
          <p className="text-center">Want a {thread?"tweet":"thread"} instead?</p>
          <button className="bg-blue-600 text-center hover:bg-blue-700 text-white font-bold mx-auto py-2 px-4 w-48 rounded-xl" onClick={()=>{setThread(prevThread => !prevThread)}} >{thread?"Create Tweet":"Create Thread"}</button>
          </div>
      </main>
    </>
  );
}
import React, { useState } from "react";

export default function Threadboard() {
  const [tweet, setTweet] = useState("");

  const [tweetTitle, setTweetTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numChars, setNumChars] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(false); // Reset copy status on fresh submission
    setIsGenerating(true);
    console.log("submitting");

    try {
      const res = await fetch("/api/returnThread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetTitle,
          domain,
          keyWords,
          tone,
          numChars,
        }),
      });

      console.log("submitted");
      const data = await res.json();
      console.log("Backend Response Data:", data);

      // CRITICAL SAFETY CHECK: Only call .trim() if data and data.tweet explicitly exist
      if (data && data.tweet) {
        setTweet(data.tweet.trim());
      } else if (data && data.error) {
        setTweet(`⚠️ Backend API Error: ${data.error.message || JSON.stringify(data.error)}\n\nPlease double check your .env.local variables or your API key configurations.`);
      } else {
        setTweet("⚠️ Received an empty or unexpected payload structure from the server route. Please check your backend terminal log files.");
      }
    } catch (err) {
      console.error("Frontend Fetch Error Loop:", err);
      setTweet("❌ Unable to connect to the local server network. Ensure your backend development environment is actively running via 'npm run dev'.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!tweet) return;
    navigator.clipboard.writeText(tweet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Automatically reset the copy button status text after 2 seconds
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tweetTitle">
                Thread Topic
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tweetTitle"
                placeholder="Thread Topic"
                id="tweetTitle"
                value={tweetTitle}
                onChange={(e) => setTweetTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="domain" className="sr-only">
                Domain
              </label>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Domain (Optional)"
                type="text"
                name="domain"
                id="domain"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                Keywords for AI (Optional)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="Keywords for AI (Optional)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
              >
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Tweets (Optional)
              </label>
              <input
                value={numChars}
                onChange={(e) => setNumChars(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Number Of Tweets - Default 5 (Optional)"
                name="words"
                id="words"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || tweetTitle === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || tweetTitle === ""}
            >
              {isGenerating ? "Generating..." : "Generate Thread"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                tweet === ""
                  ? 7
                  : tweet.split("\n").length + 12
              }
              name="output"
              onChange={(e) => setTweet(e.target.value)}
              value={tweet}
              disabled={tweet === ""}
              id="output"
              placeholder="AI Generated Thread"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className={`font-bold py-2 px-4 rounded text-white ${
                tweet === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              type="button"
              disabled={tweet === ""}
            >
              {isCopied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tweetTitle, domain, keyWords, tone, numChars } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` 
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", 
        messages: [
          {
            role: "user",
            content: `I'm looking for an effective strategy to start a twitter thread about "${tweetTitle}" ${
              domain ? `in the ${domain} domain` : ""
            } that is around ${
              numChars || 5
            } tweets long in a ${tone || "neutral"} tone. ${
              keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
            } Write a full twitter thread for me that is informative, entertaining, and highly shareable. Clear split each tweet with number breaks.`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Groq API Server Error (Thread):", data);
      return res.status(response.status || 500).json({ 
        error: data.error || { message: "Failed fetching response from Groq gateway." } 
      });
    }

    const generatedThread = data.choices[0].message.content;

    return res.status(200).json({
      tweet: generatedThread,
    });

  } catch (err) {
    console.error("Local Network Error inside Thread API Route:", err);
    return res.status(500).json({ error: { message: err.message } });
  }
}
import axios from "axios";

export const generateContent = async (prompt, tone, length) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your_openai_api_key_here") {
      throw new Error("OpenAI API key is not configured properly");
    }

    const systemPrompt = `Generate a ${length} ${tone} article/blog/post about: ${prompt}`;

    console.log("Calling OpenAI API for generation...");

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Using gpt-4o-mini for faster and cheaper responses
        messages: [
          { role: "system", content: "You are a helpful content writer." },
          { role: "user", content: systemPrompt },
        ],
        max_tokens: length === "short" ? 300 : length === "medium" ? 700 : 1200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI API response received");
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenAI generation error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const summarizeContent = async (inputText, format) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your_openai_api_key_here") {
      throw new Error("OpenAI API key is not configured properly");
    }

    const systemPrompt =
      format === "bullets"
        ? `Summarize the following text in bullet points:`
        : `Summarize the following text in a concise paragraph:`;

    console.log("Calling OpenAI API for summarization...");

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Using gpt-4o-mini for faster and cheaper responses
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: inputText },
        ],
        max_tokens: 400,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenAI API response received");
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenAI summarization error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey: process.env.API_KEY,
});

export default openai;

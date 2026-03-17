const { GoogleGenerativeAI } = require("@google/generative-ai");

// Using API key from .env file
const API_KEY = "AIzaSyDM_68LCWnJorOWTmfzUQU_YXQItU3Uw9I";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  console.log("Testing with gemini-1.5-flash and the key from .env...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello in Hindi!");
    const response = await result.response;
    console.log("Success (1.5 Flash):", response.text());
  } catch (error) {
    console.error("Gemini 1.5 Flash failed. Error:", error.message);
    console.log("Checking model names using listModels...");
    try {
        const result = await genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const res = await result.generateContent("Say Hi!");
        console.log("Success (1.5 Pro):", res.response.text());
    } catch (err2) {
        console.error("Gemini 1.5 Pro also failed. Error:", err2.message);
    }
  }
}

testGemini();

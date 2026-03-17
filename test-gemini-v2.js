const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAKD2jiL9jrcKormqaLUta_hAd_J2NaVU8";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  console.log("Testing Gemini with model 'gemini-1.5-flash-latest'...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = "Namaste! Apna ek line mein parichay do shopkeeper style mein.";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("\nResponse:", response.text());
  } catch (error) {
    console.log("\nFlash Failed, trying Gemini Pro...");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const result = await model.generateContent("Hello!");
      const response = await result.response;
      console.log("\nPro Response:", response.text());
    } catch (err) {
      console.error("\nBoth failed. Error:", err.message);
    }
  }
}

testGemini();

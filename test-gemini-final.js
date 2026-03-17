const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAKD2jiL9jrcKormqaLUta_hAd_J2NaVU8";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  console.log("Testing with simplified approach...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello!");
    const response = await result.response;
    console.log("Success:", response.text());
  } catch (error) {
    console.log("Final attempt with gemini-2.0-flash-exp...");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const result = await model.generateContent("Hello!");
      const response = await result.response;
      console.log("Success (2.0):", response.text());
    } catch (err) {
      console.error("All Model Names failed. Error:", err.message);
      console.log("\nTIP: Please check if the API key has permission for Gemini 1.5 Flash in the Google AI Studio.");
    }
  }
}

testGemini();

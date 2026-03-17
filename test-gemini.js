const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAKD2jiL9jrcKormqaLUta_hAd_J2NaVU8";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  console.log("Testing Gemini AI...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Namaste! Apna ek line mein parichay do shopkeeper style mein.";
    
    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("\nGemini Response:");
    console.log(text);
    console.log("\nGemini Key is WORKING! ✅");
  } catch (error) {
    console.error("Gemini Error:", error.message);
  }
}

testGemini();

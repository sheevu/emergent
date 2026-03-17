const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDM_68LCWnJorOWTmfzUQU_YXQItU3Uw9I";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  console.log("Listing available Gemini models...");
  try {
    const result = await genAI.listModels();
    console.log("Models found:");
    result.models.forEach(model => {
      console.log(`- ${model.name} (${model.supportedGenerationMethods.join(', ')})`);
    });
  } catch (error) {
    console.error("Gemini Error:", error.message);
  }
}

listModels();

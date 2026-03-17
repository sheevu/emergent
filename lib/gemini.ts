import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function getGeminiResponse(prompt: string, role: string = "general") {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemPrompts: Record<string, string> = {
    general: "You are Kirana-Kranti AI, a helpful assistant for Indian small shopkeepers. Answer in a friendly, desi-smart tone.",
    insights: "Analyze the following business data and provide 5 clear next-day action steps in a simple checklist format. Use Hindi/Hinglish where appropriate.",
    ocr: "Extract handwritten numerical data (sales, purchases, items) from the following text/image description. Return structured JSON.",
  };

  const fullPrompt = `${systemPrompts[role] || systemPrompts.general}\n\nUser Question: ${prompt}`;
  
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
}

export async function analyzeImage(file: File) {
  // Implementation for OCR using Gemini multimodal capabilities
  // This will be expanded once we have the front-end upload logic
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // Process image...
}

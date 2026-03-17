import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export class GeminiHelper {
  static async query(prompt: string, systemInstruction?: string) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return null;
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  static parseJson(text: string) {
    try {
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanedJson);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return null;
    }
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export class GeminiHelper {
  static async query(prompt: string, systemInstruction?: string) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.warn("Gemini API Key missing!");
      return null;
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: systemInstruction,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (e: any) {
      console.error("Gemini 2.0 Error, falling back to 1.5:", e.message);
      try {
        const model15 = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemInstruction,
        });
        const result15 = await model15.generateContent(prompt);
        const response15 = await result15.response;
        return response15.text();
      } catch (innerError) {
        console.error("Gemini 1.5 also failed:", innerError);
        return null;
      }
    }
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

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export class ScannerService {
  static async analyzeHandwrittenDiary(imageData: string): Promise<any> {
    // Expects base64 encoded image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert OCR and data extraction agent for Kirana-Kranti AI.
      Analyze this photo of a handwritten diary entry from an Indian shopkeeper.
      Your primary goal is to EXTRACT NUMBERS (Digits) for Sales and Purchases.
      Often these are written as: "Doodh - 50", "Aloo: 100", "Total Biki: 500".
      
      CRITICAL: Focus on accuracy of numbers. If a number looks like "400" but could be "900", use your best judgement based on context.
      All amounts should be numbers (no strings like "50rs").

      RETURN JSON FORMAT:
      {
        "date": "identified date in YYYY-MM-DD format",
        "totalSales": sum of all biki/sales extracted,
        "totalPurchases": sum of all kharid/purchases extracted,
        "items": [
          { "name": "item name", "type": "sale|purchase", "amount": number }
        ],
        "summary": "Detailed Hinglish summary explaining the numbers found",
        "confidence": 0.0 to 1.0
      }
    `;

    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        return this.mockAnalysis();
      }

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData.split(',')[1], // Remove prefix if present
            mimeType: "image/jpeg",
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error("Scanner Service Error:", error);
      return this.mockAnalysis();
    }
  }

  private static mockAnalysis() {
    return {
      date: new Date().toLocaleDateString(),
      totalSales: 1250,
      totalPurchases: 400,
      items: [
        { name: "Aloo", type: "sale", amount: 250 },
        { name: "Doodh", type: "purchase", amount: 400 },
        { name: "Pyaaz", type: "sale", amount: 1000 },
      ],
      summary: "[Mock] 1250 ki biki hui aur 400 ka maal kharida gaya."
    };
  }
}

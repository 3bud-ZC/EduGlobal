
import { GoogleGenAI, Type } from "@google/genai";

// This is safe because it only runs on the server
const getAiClient = () => {
  if (!process.env.API_KEY) throw new Error("API_KEY not configured");
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getSecureRecommendations = async (userProfile: any, scholarshipTitles: string[]) => {
  const ai = getAiClient();
  const prompt = `
    User Profile: ${JSON.stringify(userProfile)}
    Available Scholarships: ${scholarshipTitles.join(", ")}
    Suggest 3 matching programs with one-sentence justifications.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

export const askSeniorAdvisor = async (question: string, context: string) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Context: ${context}. Question: ${question}`,
    config: {
      systemInstruction: "You are a world-class academic advisor. Provide precise, professional study abroad guidance."
    }
  });
  return response.text;
};


import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client using the automatically injected API key
const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Expert mode using Gemini 3 Pro for complex reasoning and detailed academic advising.
 */
export const askAiAssistant = async (question: string, context?: string) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Context: ${context || 'General scholarship inquiry'}. Question: ${question}`,
      config: {
        systemInstruction: "You are a world-class senior academic advisor at EduGlobal. Your goal is to help students find and apply for international scholarships. You have deep knowledge of global education systems. Be professional, encouraging, and highly detailed. If the user mentions specific scholarships like Oxford Global Excellence, Khalifa University, DAAD, or MEXT, provide specific advice for those.",
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Pro Error:", error);
    return "I apologize, I'm having trouble connecting to my expert knowledge base right now. Please try again in a moment.";
  }
};

/**
 * Fast mode using Gemini 3 Flash for quick answers and simple queries.
 */
export const fastAiChat = async (question: string, context?: string) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context || 'General inquiry'}. Question: ${question}`,
      config: {
        systemInstruction: "You are a helpful and quick scholarship support agent. Provide concise and accurate answers to student questions.",
        temperature: 1,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Flash Error:", error);
    return "Just a quick hiccup on my end. Can you ask that again?";
  }
};

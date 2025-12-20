import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API_KEY not found in environment variables.");
    }
  }
  return aiClient;
};

export const getBaristaRecommendation = async (userPreference: string): Promise<string> => {
  const client = getAiClient();
  if (!client) return "I'm sorry, my brain is a bit foggy (API Key missing). Try the Honey Lavender Latte!";

  const menuContext = MENU_ITEMS.map(item => `${item.name} (${item.category}): ${item.description}`).join("\n");

  const prompt = `
    You are a friendly, bohemian barista at a coffee shop called "Terra & Bean".
    
    Here is our menu:
    ${menuContext}
    
    The customer says: "${userPreference}"
    
    Please recommend ONE specific item from the menu that matches their mood or taste. 
    Explain why in a short, warm, aesthetic sentence. Do not simply list items. Be conversational.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I'd recommend the Cortado. It's a classic!";
  } catch (error) {
    console.error("Error getting recommendation:", error);
    return "I'm having trouble connecting to the spirits of coffee right now. But the Cold Brew is always a good choice!";
  }
};
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const getBaristaRecommendation = async (userMood: string): Promise<string> => {
  if (!apiKey) {
    return "I'm having a little trouble connecting to my coffee senses right now (API Key missing). Try the House Latte!";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `
      You are "Velvet", a charming and knowledgeable expert barista at a high-end coffee shop called "Velvet Bean".
      Your goal is to recommend ONE specific drink from the menu below based on the user's input (mood, weather, or taste preference).
      
      MENU:
      - Espresso (Classic, bold, intense)
      - Velvet Latte (Creamy, smooth, comforting)
      - Cold Brew Tonic (Refreshing, citrusy, complex)
      - Honey Lavender Cappuccino (Floral, sweet, delicate)
      - Dark Mocha (Rich, chocolatey, indulgent)
      - Matcha Green Tea Latte (Earthy, zen, antioxidant-rich)
      - Cortado (Balanced, strong but smooth)
      
      INSTRUCTIONS:
      1. Keep your response short (under 40 words).
      2. Be warm, inviting, and slightly poetic.
      3. Explicitly name the drink you recommend.
      4. If the request is weird, playfully steer them back to coffee.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMood,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'd recommend our signature Velvet Latte today.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble thinking clearly... maybe a double espresso for me? For you, try the Cold Brew!";
  }
};
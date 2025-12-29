
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, PantryItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRecipesFromPantry = async (pantry: PantryItem[], query?: string): Promise<Recipe[]> => {
  const pantryList = pantry.map(p => `${p.name} (${p.state})`).join(", ");
  const prompt = `Based on these pantry items: ${pantryList}. ${query ? `Specific request: ${query}` : "Suggest 3 creative recipes to reduce waste."}`;

  try {
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
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
              prepTime: { type: Type.NUMBER },
              difficulty: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["id", "title", "ingredients", "instructions", "prepTime", "difficulty", "tags"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Recipe Generation Error:", error);
    return [];
  }
};

export const getSmartSubstitutions = async (recipeTitle: string, missingIngredient: string): Promise<string[]> => {
  const prompt = `I am making ${recipeTitle} but I am missing ${missingIngredient}. Suggest 3 common kitchen substitutions. Return a simple list of strings.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return ["N/A"];
  }
};

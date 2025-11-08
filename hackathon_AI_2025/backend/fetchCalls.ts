import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY});


export async function main():Promise<string> {
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
        });
        const text = response.text ?? "No content generated"; // fallback if undefined
        console.log(text);
        return text;
    }catch(error){
        console.error("Error generating content:", error);
        throw error;
    }
  
}
import { GoogleGenAI, PersonGeneration  } from "@google/genai";
import * as base64js from 'base64-js';
import * as path from "node:path";
const ai = new GoogleGenAI({apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY2});

const emotions: string[] = [
  "Happiness",
  "Joy",
  "Love",
  "Excitement",
  "Contentment",
  "Pride",
  "Gratitude",
  "Hope",
  "Affection",
  "Trust",
  "Peacefulness",
  "Curiosity",
  "Interest",
  "Acceptance",
  "Wonder",
  "Thoughtfulness",
  "Anger",
  "Frustration",
  "Annoyance",
  "Resentment",
  "Envy",
  "Hatred",
  "Sadness",
  "Grief",
  "Loneliness",
  "Disappointment",
  "Regret",
  "Sorrow",
  "Fear",
  "Anxiety",
  "Nervousness",
  "Worry",
  "Dread",
  "Insecurity",
  "Surprise",
  "Amazement",
  "Confusion",
  "Shock",
  "Guilt",
  "Shame",
  "Embarrassment",
  "Desire",
  "Passion",
  "Yearning",
  "Motivation",
  "Determination",
  "Nostalgia",
  "Boredom",
  "Overwhelm",
  "Relief",
  "Bittersweetness"
];


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



function getFourRandomEmotions(numOfOptions: number): string[] {
    const selected: string[] = [];
    const usedIndices = new Set<number>();

    while (selected.length < numOfOptions) {
        const randomIndex = Math.floor(Math.random() * emotions.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selected.push(emotions[randomIndex]);
        }
    }

    return selected;
}
type PictureGameResult = {
  result: boolean;
  image?: string;
  emotionOptions?: string[];
  error?: any;
};


export async function pictureGame(type: number): Promise<PictureGameResult> {
  try {
    // Generate one image
    const emotionOptions: string[] = getFourRandomEmotions(type);
    console.log(emotionOptions);
    const genPrompt = `Give the face of a person with the emotion ${emotionOptions[0]} `;

    const response = await ai.models.generateImages({
      model: 'models/imagen-4.0-generate-001',
      prompt: genPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        personGeneration: PersonGeneration.ALLOW_ALL,
        aspectRatio: '1:1',
        imageSize: '1K',
      },
    });

    if (!response?.generatedImages?.length) {
      throw new Error('No images generated.');
    }

    // Get the first generated image
    const imageBytes = response.generatedImages[0]?.image?.imageBytes;
    if (!imageBytes) throw new Error('No image bytes found.');

    // Convert base64 string to Buffer
    const byteArray = base64js.toByteArray(imageBytes);
    const base64String = base64js.fromByteArray(byteArray);

    // Return the buffer and/or base64 string
    return {
      result: true,
      emotionOptions,
      image: `data:image/jpeg;base64,${base64String}`, // useful for <img src="">
    };

  } catch (error) {
    console.error('Error generating image:', error);
    return { result: false, error };
  }
}
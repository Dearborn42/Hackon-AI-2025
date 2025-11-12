import { GoogleGenAI, PersonGeneration } from "@google/genai";
import * as base64js from 'base64-js';
import * as path from "node:path";
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY2 });

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


const randomSentences: string[] = [
  "The cat jumped over the fence without any hesitation.",
  "She whispered secrets only the moon could truly understand.",
  "Raindrops danced lightly on the old wooden rooftop.",
  "He carried the heavy bag across the crowded street.",
  "Birds sang melodies that echoed through the quiet forest.",
  "The glowing lantern guided them through the dark tunnel.",
  "She found a mysterious key under the dusty carpet.",
  "They laughed together, forgetting all their past disagreements.",
  "A sudden gust of wind scattered papers everywhere.",
  "He wrote letters he never intended to send.",
  "The bakery smelled like warm bread and sweet cinnamon.",
  "Lightning flashed, illuminating the abandoned house on the hill.",
  "She painted dreams that nobody else could ever see.",
  "The clock ticked loudly in the empty room.",
  "He rescued the tiny bird from the storm.",
  "Waves crashed against the rocks under the fading sunset.",
  "The garden bloomed with colors she had never imagined.",
  "He opened the old book, releasing forgotten stories inside.",
  "The streets were empty, silent under the pale moonlight.",
  "She danced alone, letting the music fill her soul."
];


export async function main(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
    const text = response.text ?? "No content generated"; // fallback if undefined
    console.log(text);
    return text;
  } catch (error) {
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
    const genPrompt = `Give the face of a ${emotionOptions[0]} person`;

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

//audio game

export function getRandomSentence(): string {
  const rand = Math.floor(Math.random() * (0 - randomSentences.length + 1)) + randomSentences.length;
  return randomSentences[rand];
}

export async function gradeSentence(inputSentence: string, answerSentence: string) {
  try {
    console.log(inputSentence, answerSentence)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Respond with true or false, nothing else if the following sentence: ${inputSentence} is relatively the same: ${answerSentence}  `,
    });
    const text = response.text ?? "No content generated"; // fallback if undefined
    console.log(text)
    return text.toLowerCase() == "true";
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
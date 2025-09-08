import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Fix: Per coding guidelines, the API key must be obtained exclusively
// from the environment variable `process.env.API_KEY`. This is more secure
// than storing it in a client-side config file.
if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createLuffyChatSession(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.8, // A bit more creative and fun
            topP: 0.9,
        },
    });
}
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessInsight = async (contextData: string, userPrompt: string): Promise<string> => {
  try {
    const fullPrompt = `
    Contexto dos Dados Atuais do SaaS:
    ${contextData}

    Pergunta do Usuário:
    ${userPrompt}

    Por favor, forneça uma análise estratégica.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar uma resposta no momento. Tente novamente.";
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação de análise. Verifique sua chave API.";
  }
};

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL_ID = 'deepseek/deepseek-chat-v3-0324:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are SkinBot, an expert skincare assistant with a friendly, concise communication style. Only answer questions about skincare, skin health, skincare products, routines, and myths. If the user asks about anything else, politely respond: "I can only answer skincare-related questions."

COMMUNICATION RULES:
- Always answer in clear, precise points or short bullet lists
- Limit each response to 2–3 concise lines maximum
- Avoid long paragraphs - break information into digestible points
- Use bullet points (•) or numbered lists when helpful
- If more detail is needed, end with "Need more details? Ask me!"
- Use simple, direct, and friendly language
- Include relevant emojis sparingly for personality (✨🌟💧🧴)

RESPONSE FORMAT:
• Key point 1
• Key point 2
• Action or next step

Provide helpful, accurate, and practical skincare advice. Debunk myths, recommend ingredient types (not specific brands), suggest routines, and explain skincare science simply.`;

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Skincare Chatbot',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    throw new Error('Failed to get response from chatbot');
  }
};
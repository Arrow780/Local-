import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cache: Record<string, { emoji: string; sentence: string }> = {};

export function useWordInfo(word: string) {
  const [info, setInfo] = useState<{ emoji: string; sentence: string } | null>(
    cache[word] || null
  );
  const [loading, setLoading] = useState(!cache[word]);

  useEffect(() => {
    if (cache[word]) {
      setInfo(cache[word]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchInfo() {
      try {
        setLoading(true);
        const prompt = `
你是一个专门为6-7岁儿童设计汉字闪卡的助手。
请为汉字 "${word}" 提供一个相关的Emoji表情，以及一句简短、生动、充满童趣的造句（10个字以内，帮助孩子联想记忆）。
请严格以JSON格式返回，不要包含其他内容：
{
  "emoji": "🍎",
  "sentence": "我爱吃红苹果。"
}
`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (text && isMounted) {
          const data = JSON.parse(text);
          cache[word] = data;
          setInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch word info:', error);
        if (isMounted) {
          // Fallback
          const fallback = { emoji: '✨', sentence: `我们来学习“${word}”字吧！` };
          cache[word] = fallback;
          setInfo(fallback);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchInfo();

    return () => {
      isMounted = false;
    };
  }, [word]);

  return { info, loading };
}

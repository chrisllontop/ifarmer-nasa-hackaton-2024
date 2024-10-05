import OpenAI from "openai";
const openai = new OpenAI();

export const prompt = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
          role: "user",
          content: "Write a haiku about recursion in programming.",
      },
    ],
  });

  return completion;
}
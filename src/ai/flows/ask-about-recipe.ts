'use server';
import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

export const askAboutRecipePrompt = ai.definePrompt({
  name: 'askAboutRecipePrompt',
  input: {
    schema: z.object({
      recipeName: z.string(),
      instructions: z.string(),
      question: z.string(),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string(),
    }),
  },

  prompt: `You are a friendly and imaginative cooking assistant with a flair for creativity and culinary storytelling. The user has a question about the following recipe.

  Recipe Name: {{recipeName}}
  
  Instructions:
  {{instructions}}
  
  User's question: {{question}}
  
  Answer the question in a helpful, engaging, and creative way. Feel free to include fun facts, comparisons, or vivid descriptions. Use your culinary knowledge and imagination to make the answer delightful and informative. If relevant, include nutritional insights or cooking tips that enhance the user's understanding and enjoyment of the recipe.`,
  
});

export async function askAboutRecipe({
  recipe,
  question,
}: {
  recipe: { recipeName: string; instructions: string };
  question: string;
}): Promise<string> {
  const { output } = await askAboutRecipePrompt({
    recipeName: recipe.recipeName,
    instructions: recipe.instructions,
    question,
  });
  return output?.answer || 'Sorry, I couldn’t find an answer.';
}

// src/ai/flows/generate-recipe.ts
'use server';

/**
 * @fileOverview A recipe generation AI agent.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const IngredientSchema = z.object({
  name: z.string().describe('The name of the ingredient.'),
  quantity: z.string().describe('The quantity of the ingredient.'),
});

const GenerateRecipeInputSchema = z.object({
  ingredients: z.array(IngredientSchema).describe('A list of ingredients and their quantities.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  instructions: z.string().describe('The detailed instructions for preparing the recipe.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {
    schema: z.object({
      ingredients: z.array(IngredientSchema).describe('A list of ingredients and their quantities.'),
    }),
  },
  output: {
    schema: z.object({
      recipeName: z.string().describe('The name of the generated recipe.'),
      instructions: z.string().describe('The detailed instructions for preparing the recipe.'),
    }),
  },
  prompt: `You are a professional chef. Generate a recipe based on the ingredients and quantities provided by the user.\n\nIngredients:\n{{#each ingredients}}- {{this.name}}: {{this.quantity}}\n{{/each}}\n\nRecipe Name: (Suggest a creative and appropriate name for the recipe.)\nInstructions: (Provide detailed, step-by-step instructions for preparing the recipe.)`,
});

const generateRecipeFlow = ai.defineFlow<
  typeof GenerateRecipeInputSchema,
  typeof GenerateRecipeOutputSchema
>(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt(input);
    return output!;
  }
);

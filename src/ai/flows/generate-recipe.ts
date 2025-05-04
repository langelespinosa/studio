// src/ai/flows/generate-recipe.ts
'use server';

/**
 * @fileOverview A recipe generation AI agent.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
*/
     
import {z} from 'zod';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios

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
  ingredients: z.array(z.string()).describe('The ingredients to prepare the recipe.'),
  instructions: z.array(z.string()).describe('The detailed instructions for preparing the recipe.'),
  recommendations: z.array(z.string()).describe('A piece of advice from the chef.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  try {
    const response = await axios.post('http://localhost:5000/gen_recipe', input); //URL del servidor Flask
    return response.data;
  } catch (error) {
    console.error('Error calling Flask server:', error);
    throw error; // O maneja el error de la manera que prefieras
  }
}

'use client';
import type { GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { generateRecipe } from '@/ai/flows/generate-recipe.ts';
import { RecipeForm, type RecipeFormValues } from '@/components/recipe-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState, type CSSProperties } from 'react';
import { AlertCircle, ChefHat } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Custom styles for loading spinner to match accent color
const spinnerStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    border: '3px solid hsla(var(--accent-foreground), 0.2)',
    borderTopColor: 'hsl(var(--accent-foreground))',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
};

const keyframes = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

export default function Home() {
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000';

  const handleGenerateRecipe = async (formData: RecipeFormValues) => {
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);

    const input: GenerateRecipeInput = {
        ingredients: formData.ingredients.filter(
          (ing) => ing.name.trim() !== '' // Filter out empty ingredient names
        ).map((ing) => ({
          name: ing.name,
          quantity: ing.quantity || 'some', // Default quantity if empty
        })),
    };

    // Basic validation: Check if at least one ingredient is provided
    if (input.ingredients.length === 0) {
        setError('Please add at least one ingredient.');
        setIsLoading(false);
        return;
    }


    try {
      const recipe = await generateRecipe(input);
      setGeneratedRecipe(recipe);
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <header className="mb-8 flex flex-col items-center text-center">
         <div className="mb-4 rounded-full bg-primary p-3 text-primary-foreground">
            <ChefHat size={40} />
          </div>
          <h1 className="text-4xl font-bold text-primary">Recipe Generator</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Enter the ingredients you have, and let AI create a recipe for you!
          </p>
        </header>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Your Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
          </CardContent>
        </Card>

        {isLoading && (
           <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div style={spinnerStyle} className="mb-4"></div>
            <p className="text-lg font-medium text-primary">Generating your recipe...</p>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        )}

        {error && (
           <Alert variant="destructive" className="mb-8">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        )}

        {generatedRecipe && !isLoading && (
          <>
            <Separator className="my-8" />
            <Card className="shadow-md">
                 <CardHeader>
                    <CardTitle className="text-2xl text-primary">{generatedRecipe.recipeName}</CardTitle>
                </CardHeader>
                 <CardContent>
                    <RecipeDisplay recipe={generatedRecipe} />
                </CardContent>
            </Card>
         </>
        )}

        <footer className="mt-12 pt-6 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Recipe Generator. Powered by AI.</p>
        </footer>
      </div>
      </>
  );
}

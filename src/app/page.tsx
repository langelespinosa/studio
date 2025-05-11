'use client';
import type { GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { generateRecipe } from '@/ai/flows/generate-recipe';
import { RecipeForm, type RecipeFormValues } from '@/components/recipe-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState, type CSSProperties } from 'react';
import { AlertCircle, ChefHat } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { askAboutRecipe } from '@/ai/flows/ask-about-recipe';
import Image from 'next/image'


import Link from 'next/link';

// Custom styles for loading spinner to match accent color
const spinnerStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    border: '3px solid hsla(var(--accent-foreground), 0.2)',
    borderTopColor: 'hsl(var(--accent-foreground))',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
};

const keyframes: string = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

export default function Home() {
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false); // Simulate premium status
  const [chatEnabled, setChatEnabled] = useState(false);

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
      setChatEnabled(true); // <-- Aquí habilitas el chat
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (!generatedRecipe) return;
  
    setChatMessages((prev) => [...prev, `You: ${message}`]);
  
    try {
      const reply = await askAboutRecipe({
        recipe: generatedRecipe,
        question: message,
      });
  
      setChatMessages((prev) => [...prev, `AI: ${reply}`]);
    } catch (err) {
      console.error('Error responding to chat:', err);
      setChatMessages((prev) => [...prev, 'AI: Sorry, I had trouble answering that.']);
    }
  };
  

  return (
    <>
      <style>{keyframes}</style>
      <div className="container mx-auto max-w-3xl px-4 py-8 flex-grow ocean-background">
        <header className="mb-8 flex flex-col items-center text-center">
          <img src="./images/AI-xolotl.png" alt="AI-xolotl" width={110} className='rounded-full aspect-square object-cover'/>
          <h1 className="text-4xl font-bold text-pink-400">Chef AI-xolotl</h1>
          <p className="mt-2 text-lg text-white">
            Ingrese los ingredientes con los que cuenta, y permita que el chef cree una receta para usted.
          </p>
        </header>

        <Card className="mb-8 shadow-md text-pink-700">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-600">Ingredientes:</CardTitle>
          </CardHeader>
          <CardContent>
            <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div style={spinnerStyle} className="mb-4"></div>
            <p className="text-lg font-medium text-primary">Generando receta...</p>
            <p className="text-muted-foreground">Espere un momento.</p>
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
                <CardTitle className="text-2xl text-pink-700">{generatedRecipe.recipeName}</CardTitle>
              </CardHeader>
              <CardContent>
                <RecipeDisplay recipe={generatedRecipe} />
              </CardContent>
            </Card>
          </>
        )}

        {/* Chat Section */}
        {chatEnabled && generatedRecipe && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-pink-300">Conversar sobre la receta</h2>
            <div className="border rounded-md p-4 h-40 overflow-y-auto mb-4 text-pink-200">
              {chatMessages.map((message, index) => (
                <div key={index} className="mb-2">{message}</div>
              ))}
              {chatMessages.length === 0 && <div className="text-white">Iniciar conversación!</div>}
            </div>
            {(!isPremium && chatMessages.length >= 5) ? (
              <p className="text-sm text-white">Has alcanzado el límite de mensajes para esta receta. Cambiate a premium para conversaciones ilimitadas!</p>
            ) : (
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow border rounded-md p-2 mr-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val !== '') {
                        handleChatMessage(val);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />

              </div>
            )}
          </div>
        )}
        <footer className="mt-12 pt-6 border-t text-center text-white">
          <p>&copy; {new Date().getFullYear()} AI-xolotl. Powered by Gemini. Created by 
            <Link href="https://github.com/MartinOtamendiT" target="_blank" className="text-blue-400 hover:underline"> Martin Otamendi</Link> & 
            <Link href="https://github.com/langelespinosa" target="_blank" className="text-blue-400 hover:underline"> Luis Ángel Espinosa</Link>.
          </p>
        </footer>
      </div>
    </>   
  );
}
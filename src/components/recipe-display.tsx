
'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
    // Split instructions into steps based on numbering or newlines
    const instructionSteps = recipe.instructions
        .split(/\n(?=\d+\.\s)/) // Split by number followed by dot and space at the beginning of a line
        .map(step => step.trim())
        .filter(step => step.length > 0); // Remove empty steps


  return (
      <div className="space-y-6">
        <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Instructions</h3>
             <ol className="list-decimal list-inside space-y-3 text-foreground">
                 {instructionSteps.map((step, index) => (
                    <li key={index} className="leading-relaxed">
                        {/* Remove the leading number and dot if present */}
                        {step.replace(/^\d+\.\s*/, '')}
                    </li>
                 ))}
            </ol>
         </div>
    </div>
  );
}

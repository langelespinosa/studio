
'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="space-y-6">
      <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">Ingredientes</h3>
            <ul className="list-disc list-inside space-y-3 text-foreground">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {/* Remove the leading number and dot if present */}
                  {item.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 text-primary">Instrucciones</h3>
          <ol className="list-decimal list-inside space-y-3 text-foreground">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {/* Remove the leading number and dot if present */}
                {step.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 text-primary">Recomendaciones</h3>
          <ol className="list-disc list-inside space-y-3 text-foreground">
            {recipe.recommendations.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {/* Remove the leading number and dot if present */}
                {item.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
      </div>
    </div>
  );
}

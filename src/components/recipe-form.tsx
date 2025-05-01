
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Plus, Trash2, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { CSSProperties } from 'react';

const ingredientSchema = z.object({
  name: z.string().min(1, { message: 'Ingredient name cannot be empty.' }).max(50, { message: 'Ingredient name too long.'}),
  quantity: z.string().max(30, { message: 'Quantity description too long.'}).optional(),
});

const recipeFormSchema = z.object({
  ingredients: z.array(ingredientSchema).min(1, { message: 'Please add at least one ingredient.' }),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface RecipeFormProps {
  onSubmit: (values: RecipeFormValues) => void;
  isLoading: boolean;
}

// Custom styles for loading spinner
const spinnerStyle: CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid hsla(var(--accent-foreground), 0.2)',
    borderTopColor: 'hsl(var(--accent-foreground))',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
    animation: 'spin 1s linear infinite',
};

const keyframes = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;


export function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      ingredients: [{ name: '', quantity: '' }],
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const handleAddIngredient = () => {
    append({ name: '', quantity: '' });
  };

  const handleRemoveIngredient = (index: number) => {
    if (fields.length > 1) { // Prevent removing the last field
        remove(index);
    }
  };

  return (
    <>
     <style>{keyframes}</style>
     <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-2">
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={index !== 0 ? 'sr-only' : ''}>Ingredient</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Flour" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                       <FormLabel className={index !== 0 ? 'sr-only' : ''}>Approx. Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 cups" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveIngredient(index)}
                  disabled={fields.length <= 1}
                  className={`mt-8 ${fields.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-destructive/10 hover:text-destructive'}`}
                  aria-label="Remove ingredient"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddIngredient}
            className="mt-2 border-dashed border-primary text-primary hover:bg-primary/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
          </Button>

        <Separator className="my-6" />

        {/* Premium Options Section */}
         <Card className="border-dashed border-muted-foreground bg-muted/30 opacity-70 cursor-not-allowed">
            <CardHeader>
                <CardTitle className="text-lg text-muted-foreground flex items-center">
                     <Lock size={18} className="mr-2" />
                     Premium Options (Coming Soon)
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 {/* Model Creativity */}
                 <div>
                     <Label className="text-muted-foreground">Model Creativity</Label>
                    <RadioGroup defaultValue="standard" className="mt-2 flex space-x-4" disabled>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="text-muted-foreground">Standard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="creative" id="creative" />
                             <Label htmlFor="creative" className="text-muted-foreground">Creative</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ultra-creative" id="ultra-creative" />
                             <Label htmlFor="ultra-creative" className="text-muted-foreground">Ultra Creative</Label>
                        </div>
                    </RadioGroup>
                 </div>

                {/* Recipe Type */}
                <div>
                    <Label className="text-muted-foreground">Recipe Type</Label>
                    <RadioGroup defaultValue="any" className="mt-2 flex space-x-4" disabled>
                        <div className="flex items-center space-x-2">
                             <RadioGroupItem value="any" id="any" />
                            <Label htmlFor="any" className="text-muted-foreground">Any</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="kosher" id="kosher" />
                            <Label htmlFor="kosher" className="text-muted-foreground">Kosher</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="vegan" id="vegan" />
                             <Label htmlFor="vegan" className="text-muted-foreground">Vegan</Label>
                        </div>
                        {/* Add more recipe types as needed */}
                    </RadioGroup>
                </div>
             </CardContent>
         </Card>


          <Button type="submit" disabled={isLoading} size="lg" className="w-full btn-accent">
             {isLoading ? (
                <>
                 <span style={spinnerStyle}></span>
                 Generating...
                </>
             ) : (
                 'Generate Recipe'
             )}
          </Button>
           {/* Display global form error if ingredients array is empty after submission */}
           {form.formState.errors.ingredients?.root && (
             <p className="text-sm font-medium text-destructive">{form.formState.errors.ingredients.root.message}</p>
           )}
        </form>
      </Form>
      </TooltipProvider>
      </>
  );
}


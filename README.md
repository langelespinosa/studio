
# Recipe Generator

This is a Next.js application built with Firebase Studio that allows users to generate recipes based on the ingredients they have available. It uses AI (via Google's Gemini API) to create the recipes.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

The core features include:
- Dynamic ingredient input fields.
- Recipe generation using the `generateRecipe` AI flow.
- Display of the generated recipe.

## Development

- Run the Next.js development server:
  ```bash
  npm run dev
  ```
- Run the Genkit development server (for AI flow testing):
  ```bash
  npm run genkit:dev
  ```
  or with file watching:
  ```bash
  npm run genkit:watch
  ```

## Building for Production

```bash
npm run build
```

## Starting the Production Server

```bash
npm run start
```

## Linting and Type Checking

- Lint the code:
  ```bash
  npm run lint
  ```
- Check for TypeScript errors:
  ```bash
  npm run typecheck
  ```

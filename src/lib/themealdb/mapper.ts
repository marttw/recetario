import type { Ingredient, Recipe } from "@/models/recipe";
import type { TheMealDbMeal } from "./types";

const INGREDIENT_INDEXES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const;

function emptyToNull(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapIngredients(meal: TheMealDbMeal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (const i of INGREDIENT_INDEXES) {
    const name = emptyToNull(meal[`strIngredient${i}`]);

    if (name === null) {
      continue;
    }

    ingredients.push({ name, measure: emptyToNull(meal[`strMeasure${i}`]) });
  }

  return ingredients;
}

function mapTags(tags: string | null): string[] {
  if (tags === null) {
    return [];
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
}

export function mapMealToRecipe(meal: TheMealDbMeal): Recipe {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    alternateTitle: emptyToNull(meal.strMealAlternate),
    // TODO: validar con Zod
    category: meal.strCategory ?? "",
    country: emptyToNull(meal.strCountry) ?? emptyToNull(meal.strArea),
    // TODO: validar con Zod
    instructions: meal.strInstructions ?? "",
    image: emptyToNull(meal.strMealThumb),
    tags: mapTags(meal.strTags),
    youtubeLink: emptyToNull(meal.strYoutube),
    ingredients: mapIngredients(meal),
    recipeSource: emptyToNull(meal.strSource),
  };
}

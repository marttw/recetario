export interface Recipe {
  id: string;
  title: string;
  alternateTitle: string | null;
  category: string;
  country: string | null;
  instructions: string;
  image: string | null;
  tags: string[];
  youtubeLink: string | null;
  ingredients: Ingredient[];
  recipeSource: string | null;
}

export interface Ingredient {
  name: string;
  measure: string | null;
}

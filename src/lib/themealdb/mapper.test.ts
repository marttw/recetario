import { describe, expect, it } from "vitest";
import arrabiata from "./__fixtures__/arrabiata.json";
import { mapMealToRecipe } from "./mapper";
import type { TheMealDbResponse } from "./types";

describe("mapMealToRecipe", () => {
  it("maps id, title and country", () => {
    const response: TheMealDbResponse = arrabiata;
    const meal = response.meals?.[0];

    if (!meal) {
      throw new Error("Fixture has no meals");
    }

    const recipe = mapMealToRecipe(meal);

    expect(recipe.id).toBe("52771");
    expect(recipe.title).toBe("Spicy Arrabiata Penne");
    expect(recipe.country).toBe("Italy");
  });
});

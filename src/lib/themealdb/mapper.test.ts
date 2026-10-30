import { describe, expect, it } from "vitest";
import arrabiata from "./__fixtures__/arrabiata.json";
import slagroomtaart from "./__fixtures__/slagroomtaart.json";
import { mapMealToRecipe } from "./mapper";
import type { TheMealDbMeal, TheMealDbResponse } from "./types";

function firstMeal(response: TheMealDbResponse): TheMealDbMeal {
  const meal = response.meals?.[0];

  if (!meal) {
    throw new Error("Fixture has no meals");
  }

  return meal;
}

describe("mapMealToRecipe", () => {
  it("maps id, title and country", () => {
    const recipe = mapMealToRecipe(firstMeal(arrabiata));

    expect(recipe.id).toBe("52771");
    expect(recipe.title).toBe("Spicy Arrabiata Penne");
    expect(recipe.country).toBe("Italy");
  });

  it("maps non-empty ingredients with their measures", () => {
    const recipe = mapMealToRecipe(firstMeal(arrabiata));

    expect(recipe.ingredients).toHaveLength(8);
    expect(recipe.ingredients[0]).toEqual({
      name: "penne rigate",
      measure: "1 pound",
    });
  });

  it("trims ingredient measures", () => {
    const recipe = mapMealToRecipe(firstMeal(slagroomtaart));

    expect(recipe.ingredients).toHaveLength(10);
    expect(recipe.ingredients[1]).toEqual({ name: "Sugar", measure: "100g" });
  });

  it("splits tags and returns an empty list when there are none", () => {
    expect(mapMealToRecipe(firstMeal(arrabiata)).tags).toEqual([
      "Pasta",
      "Curry",
    ]);
    expect(mapMealToRecipe(firstMeal(slagroomtaart)).tags).toEqual([]);
  });

  it("uses strCountry when strArea is null", () => {
    const recipe = mapMealToRecipe(firstMeal(slagroomtaart));

    expect(recipe.country).toBe("Netherlands");
  });

  it("maps the image URL", () => {
    const recipe = mapMealToRecipe(firstMeal(arrabiata));

    expect(recipe.image).toBe(
      "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    );
  });

  it("returns a null image when strMealThumb is empty", () => {
    const meal = { ...firstMeal(arrabiata), strMealThumb: "" };

    expect(mapMealToRecipe(meal).image).toBeNull();
  });

  it("falls back to strArea when strCountry is empty", () => {
    const meal = { ...firstMeal(arrabiata), strCountry: "" };

    expect(mapMealToRecipe(meal).country).toBe("Italian");
  });
});

import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

///////////////////////////////////////////////// STATE FUNC
export const state = {
	recipe: {},
};

///////////////////////////////////////////////// LOAD RECIPE
export const loadRecipe = async function (id) {
	////////// FUNCTIONALITY => Loading recipe

	try {
		const data = await getJSON(`${API_URL}/${id}`);

		// DOES => Create a new recipe variable to format the data output
		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};

		console.log(state.recipe);
	} catch (err) {
		throw err;
	}
};

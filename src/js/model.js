import { async } from "regenerator-runtime";

///////////////////////////////////////////////// STATE FUNC
export const state = {
	recipe: {},
};

///////////////////////////////////////////////// LOAD RECIPE
export const loadRecipe = async function (id) {
	////////// FUNCTIONALITY => Loading recipe

	try {
		// DOES => Sends request to API for a specific recipe ID
		const res = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
		);

		// DOES => Converts the response gotten form the API to JSON format
		const data = await res.json();

		// DOES => If Response ok is false, throw a new error with the message coming from the message property on the data and the status code
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
		alert(err);
	}
};

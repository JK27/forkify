import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

///////////////////////////////////////////////// STATE FUNC
// DOES => Contains all data needed to build application
export const state = {
	recipe: {},
	search: {
		query: "",
		results: [],
	},
};

///////////////////////////////////////////////// LOAD RECIPE
////////// FUNCTIONALITY => Loads recipe with specific ID
export const loadRecipe = async function (id) {
	try {
		const data = await getJSON(`${API_URL}${id}`);

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
	} catch (err) {
		console.log(`${err} 💥💥💥`);
		throw err;
	}
};

///////////////////////////////////////////////// SEARCH FUNCTINOALITY
// FUNCTIONALITY => Searches for recipes based on search input (query)
export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(`${API_URL}?search=${query}`);
		console.log(data);

		// DOES => Gets recipe data from search query and returns a new array with new object
		state.search.results = data.data.recipes.map(rec => {
			return {
				id: rec.id,
				title: rec.title,
				publisher: rec.publisher,
				image: rec.image_url,
			};
		});
	} catch (err) {
		console.log(`${err} 💥💥💥`);
		throw err;
	}
};

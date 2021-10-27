///////////////////////////////////////////////////////////////////// IMPORTS
import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
import { RESULTS_PER_PAGE } from "./config.js";

///////////////////////////////////////////////////////////////////// STATE FUNC
// DOES => Contains all data needed to build application
export const state = {
	recipe: {},
	search: {
		query: "",
		results: [],
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
};

///////////////////////////////////////////////////////////////////// LOAD RECIPE
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

///////////////////////////////////////////////////////////////////// SEARCH FUNCTINOALITY
// FUNCTIONALITY => Searches for recipes based on search input (query)
export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(`${API_URL}?search=${query}`);

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

///////////////////////////////////////////////////////////////////// GET SEARCH RESULTS PAGE
// FUNCTIONALITY => Returns the search results, by default starting on page 1
export const getSearchResutlsPage = function (page = state.search.page) {
	state.search.page = page;

	const start = (page - 1) * state.search.resultsPerPage;
	const end = page * state.search.resultsPerPage;

	// DOES => Returns search results in intervals of 10 at a time
	return state.search.results.slice(start, end);
};

///////////////////////////////////////////////////////////////////// UPDATE SERVINGS
export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach(ing => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

		// newQty = oldQty * newServings / oldServings
	});

	state.recipe.servings = newServings;
};

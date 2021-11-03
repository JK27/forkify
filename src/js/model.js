///////////////////////////////////////////////////////////////////// IMPORTS
import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
// import { getJSON, sendJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";
import { RESULTS_PER_PAGE, KEY } from "./config.js";

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
	bookmarks: [],
};

///////////////////////////////////////////////////////////////////// CREATE RECIPE OBJECT
const createRecipeObject = function (data) {
	// DOES => Create a new recipe variable to format the data output
	const { recipe } = data.data;
	return {
		id: recipe.id,
		title: recipe.title,
		publisher: recipe.publisher,
		sourceUrl: recipe.source_url,
		image: recipe.image_url,
		servings: recipe.servings,
		cookingTime: recipe.cooking_time,
		ingredients: recipe.ingredients,
		// DOES => Creates a recipe key only if that key actually exists
		...(recipe.key && { key: recipe.key }),
	};
};

///////////////////////////////////////////////////////////////////// LOAD RECIPE
////////// FUNCTIONALITY => Loads recipe with specific ID
export const loadRecipe = async function (id) {
	try {
		const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
		state.recipe = createRecipeObject(data);

		if (state.bookmarks.some(bookmark => bookmark.id === id))
			state.recipe.bookmarked = true;
		else state.recipe.bookmarked = false;
	} catch (err) {
		console.log(`${err} 💥💥💥`);
		throw err;
	}
};

///////////////////////////////////////////////////////////////////// LOAD SEARCH RESULTS
// FUNCTIONALITY => Searches for recipes based on search input (query)
export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

		// DOES => Gets recipe data from search query and returns a new array with new object
		state.search.results = data.data.recipes.map(rec => {
			return {
				id: rec.id,
				title: rec.title,
				publisher: rec.publisher,
				image: rec.image_url,
				// DOES => Creates a recipe key only if that key actually exists
				...(rec.key && { key: rec.key }),
			};
		});
		// DOES => When loading a new search, the page will reset to 1
		state.search.page = 1;
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
	});

	state.recipe.servings = newServings;
};

///////////////////////////////////////////////////////////////////// PERSIST BOOKMARKS
// FUNCTIONALITY => Keeps bookmarks data in local storage to persist page reloads
const persistBookmarks = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

///////////////////////////////////////////////////////////////////// ADD BOOKMARK
// FUNCTIONALITY => Adds recipe to the bookmarks
export const addBookmark = function (recipe) {
	// DOES => Adds to bookmarks list
	state.bookmarks.push(recipe);

	// DOES => Bookmarks recipe
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

	persistBookmarks();
};

///////////////////////////////////////////////////////////////////// REMOVE BOOKMARK
// FUNCTIONALITY => Removes recipe from the bookmarks
export const removeBookmark = function (id) {
	const index = state.bookmarks.findIndex(el => el.id === id);
	// DOES => Removes from bookmarks list
	state.bookmarks.splice(index, 1);

	// DOES => Unbookmarks recipe
	if (id === state.recipe.id) state.recipe.bookmarked = false;

	persistBookmarks();
};

///////////////////////////////////////////////////////////////////// INIT
const init = function () {
	const storage = localStorage.getItem("bookmarks");

	if (storage) state.bookmarks = JSON.parse(storage);
};

init();

///////////////////////////////////////////////////////////////////// CLEAR BOOKMARKS
const clearBookmarks = function () {
	localStorage.clear("bookmarks");
};

// clearBookmarks();

///////////////////////////////////////////////////////////////////// UPLOAD RECIPE

export const uploadRecipe = async function (newRecipe) {
	// FUNCTIONALITY => Uploads new recipe as a new object
	try {
		// DOES => Gets ingredients from array filtering entries which 1st element starts with 'ingredient' and 2nd is not empty
		const ingredients = Object.entries(newRecipe)
			.filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
			.map(ing => {
				// DOES => Replaces spaces with empty strings and seperates each element by the comma; returning each element as a keys of the ingredients object...
				const ingArr = ing[1].split(",").map(el => el.trim());
				// DOES => ... and checks if lenght of array is not 3 elements, then throws error
				if (ingArr.length !== 3)
					throw new Error(
						"Wrong ingredient format. Please use the correct format"
					);

				const [quantity, unit, description] = ingArr;
				// DOES => Converts quantity string into number. If no quantity, returns null
				return { quantity: quantity ? +quantity : null, unit, description };
			});

		// FUNCTIONALITY => Converts recipe into new object ready to send to API
		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		};
		console.log(recipe);
		// FUNCTIONALITY => Sends new recipe data to API
		const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
		// DOES => Adds recipe to the state
		state.recipe = createRecipeObject(data);
		// DOES => Automatically bookmarks created recipe
		addBookmark(state.recipe);
	} catch (err) {
		throw err;
	}
};

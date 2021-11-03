///////////////////////////////////////////////////////////////////// IMPORTS
import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable"; // DOES => Polyfilling ES6 JS
import "regenerator-runtime/runtime"; // DOES => Polyfilling async await

if (module.hot) {
	module.hot.accept();
}

///////////////////////////////////////////////////////////////////// REGENARATOR RUNTIME
const { async } = require("regenerator-runtime");

///////////////////////////////////////////////////////////////////// CONTROL RECIPES
const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		// DOES => Guard clause. If there is no recipe ID, simply return the page
		if (!id) return;

		////////// FUNCTIONALITY => Render spinner
		recipeView.renderSpinner();

		// FUNCTIONALITY => Mark selected search result
		resultsView.update(model.getSearchResutlsPage());

		////////// FUNCTIONALITY => Load recipe
		// DOES => Loads recipe and stores it into state object in models.js
		await model.loadRecipe(id);

		////////// FUNCTIONALITY => Render recipe
		// DOES => Takes data loaded in model.state.recipe and passes it into recipeView.render method...
		recipeView.render(model.state.recipe);

		bookmarksView.update(model.state.bookmarks);
	} catch (err) {
		// DOES => ... or displays error message
		recipeView.renderError();
	}
};

///////////////////////////////////////////////////////////////////// CONTROL SEARCH RESULTS
const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner();

		// FUNCTIONALITY =>Gets the value from the search input field
		const query = searchView.getQuery();
		if (!query) return;

		// FUNCTIONALITY => Load search results
		await model.loadSearchResults(query);

		// FUNCTIONALITY => Render search results
		resultsView.render(model.getSearchResutlsPage());

		// FUNCTIONALITY => Render initial pagination buttons
		paginationView.render(model.state.search);
	} catch (err) {
		console.log(err);
	}
};

///////////////////////////////////////////////////////////////////// CONTROL PAGINATION
const controlPagination = function (goToPage) {
	// FUNCTIONALITY => Render new results for selected page
	resultsView.render(model.getSearchResutlsPage(goToPage));

	// FUNCTIONALITY => Render new pagination buttons
	paginationView.render(model.state.search);
};

///////////////////////////////////////////////////////////////////// CONTROL SERVINGS
const controlServings = function (newServings) {
	// FUNCTIONALITY => Update recipe servings in state
	model.updateServings(newServings);

	// FUNCTIONALITY => Update recipe view
	// recipeView.render(model.state.recipe);
	// DOES => Update() only refreshes text and attr instead of reloading the whole page
	recipeView.update(model.state.recipe);
};

///////////////////////////////////////////////////////////////////// CONTROL ADD BOOKMARK
const controlAddBookmark = function () {
	// FUNCTIONALITY => If recipe is not bookmarked, bookmark recipe
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	// FUNCTIONALITY => If recipe is bookmarked, remove bookmark
	else model.removeBookmark(model.state.recipe.id);

	recipeView.update(model.state.recipe);

	// FUNCTIONALITY => Render bookmarks
	bookmarksView.render(model.state.bookmarks);
};

///////////////////////////////////////////////////////////////////// CONTROL BOOKMARKS
const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

///////////////////////////////////////////////////////////////////// CONTROL ADD RECIPE
const controlAddRecipe = async function (newRecipe) {
	try {
		// FUNCTIONALITY => Render spinner
		addRecipeView.renderSpinner();

		// FUNCTIONALITY => Upload new recipe
		await model.uploadRecipe(newRecipe);
		console.log(model.state.recipe);

		// FUNCTIONALITY => Render new recipe
		recipeView.render(model.state.recipe);

		// FUNCTIONALITY => Display success message
		addRecipeView.renderMessage();

		// FUNCTIONALITY => Render bookmark view
		bookmarksView.render(model.state.bookmarks);

		// FUNCTIONALITY => Change ID in URL
		window.history.pushState(null, "", `#${model.state.recipe.id}`);

		// FUNCTIONALITY => Close form window
		setTimeout(function () {
			addRecipeView.toggleWindow();
		}, MODAL_CLOSE_SEC * 1000);
	} catch (err) {
		console.error("💥", err);
		addRecipeView.renderError(err.message);
	}
};

///////////////////////////////////////////////////////////////////// INIT FUNC
const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks);
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

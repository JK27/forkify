///////////////////////////////////////////////// IMPORTS
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; // DOES => Polyfilling ES6 JS
import "regenerator-runtime/runtime"; // DOES => Polyfilling async await

///////////////////////////////////////////////// REGENARATOR RUNTIME
const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////////// CONTROL RECIPES FUNC
const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		// DOES => Guard clause. If there is no recipe ID, simply return the page
		if (!id) return;

		////////// FUNCTIONALITY => Render spinner
		recipeView.renderSpinner();

		////////// FUNCTIONALITY => Load recipe
		// DOES => Loads recipe and stores it into state object in models.js
		await model.loadRecipe(id);

		////////// FUNCTIONALITY => Render recipe
		// DOES => Takes data loaded in model.state.recipe and passes it into recipeView.render method...
		recipeView.render(model.state.recipe);
	} catch (err) {
		// DOES => ... or displays error message
		recipeView.renderError();
	}
};

///////////////////////////////////////////////// INIT FUNC
const init = function () {
	recipeView.addHandlerRender(controlRecipes);
};

init();

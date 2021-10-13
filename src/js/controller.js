///////////////////////////////////////////////// IMPORTS
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; // DOES => Polyfilling ES6 JS
import "regenerator-runtime/runtime"; // DOES => Polyfilling async await

///////////////////////////////////////////////// REGENARATOR RUNTIME
const { async } = require("regenerator-runtime");

const recipeContainer = document.querySelector(".recipe");

///////////////////////////////////////////////// TIMEOUT FUNC
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////////// SHOW RECIPE
const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);
		console.log(id);

		// DOES => Guard clause. If there is no recipe ID, simply return the page
		if (!id) return;

		////////// FUNCTIONALITY => Render spinner
		recipeView.renderSpinner();

		////////// FUNCTIONALITY => Load recipe
		// DOES => Loads recipe and stores it into state object in models.js
		await model.loadRecipe(id);

		////////// FUNCTIONALITY => Render recipe
		// DOES => Takes data loaded in model.state.recipe and passes it into recipeView.render method
		recipeView.render(model.state.recipe);
	} catch (err) {
		alert(err);
	}
};

///////////////////////////////////////////////// HASHCHANGE & LOAD LISTENERs
// DOES => When the hash referring to the recipe ID on the url changes, it shows the recipe with that ID
["hashchange", "load"].forEach(ev =>
	window.addEventListener(ev, controlRecipes)
);
// SAME AS =>
/*
window.addEventListener("hashchange", controlRecipes);
window.addEventListener("load", controlRecipes);
*/

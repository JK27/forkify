///////////////////////////////////////////////// IMPORTS
import icons from "../../img/icons.svg"; // DOES => Imports icons to be used in markup
import { Fraction } from "fractional";

///////////////////////////////////////////////// RECIPE VIEW
class RecipeView {
	//////////////////////////////// PRIVATE PROPERTIES
	#parentElement = document.querySelector(".recipe");
	#data;
	#errorMessage = "Recipe not found. Please try another search.";
	#message = "";

	//////////////////////////////// RENDER METHOD
	// FUNCTIONALITY => Stores data received from controller.showRecipe
	render(data) {
		this.#data = data;
		const markup = this.#generateMarkup();
		this.#clear();

		// DOES => Inserts markup var into recipe container (.recipe) HMTL, rendering the recipe
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	// FUNCTIONALITY => Empties recipe container before inserting markup above
	#clear() {
		this.#parentElement.innerHTML = "";
	}

	//////////////////////////////// RENDER SPINNER
	////////// FUNCTIONALITY => Inserts spinner svg into recipe container HTML el while loading the page
	renderSpinner() {
		const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

		// DOES => Empties recipe container before inserting spinner markup
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//////////////////////////////// RENDER ERROR
	// FUNCTIONALITY => Displays error message, using #errorMessage as default
	renderError(message = this.#errorMessage) {
		const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

		// DOES => Empties recipe container before inserting error message markup
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//////////////////////////////// RENDER MESSAGE
	// FUNCTIONALITY => Displays  message, using #message as default
	renderMessage(message = this.#message) {
		const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

		// DOES => Empties recipe container before inserting error message markup
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//////////////////////////////// ADD HANDLER RENDER METHOD
	addHandlerRender(handler) {
		///////////////////////////////////////////////// HASHCHANGE & LOAD LISTENERS
		// DOES => When the hash referring to the recipe ID on the url changes, it shows the recipe with that ID
		["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
		// SAME AS =>
		/*
    window.addEventListener("hashchange", controlRecipes);
    window.addEventListener("load", controlRecipes);
    */
	}

	//////////////////////////////// GENERATE MARKUP METHOD
	#generateMarkup() {
		return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
			this.#data.title
		}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
							this.#data.cookingTime
						}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
							this.#data.servings
						}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients
						.map(this.#generateMarkupIngredient)
						.join("")}            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
							this.#data.publisher
						}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
	}

	//////////////////////////////// GENERATE MARKUP INGREDIENT METHOD
	#generateMarkupIngredient(ing) {
		return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
				ing.quantity ? new Fraction(ing.quantity).toString() : ""
			}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
	}
}

export default new RecipeView();

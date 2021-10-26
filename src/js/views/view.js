///////////////////////////////////////////////// IMPORTS
import icons from "../../img/icons.svg"; // DOES => Imports icons to be used in markup

///////////////////////////////////////////////// VIEW CLASS
export default class View {
	_data;
	//////////////////////////////// RENDER METHOD
	// FUNCTIONALITY => Stores data received from controller.showRecipe
	render(data) {
		// DOES => Guard clause. If there is no data or if data is an empty array, simply return and display error message
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();
		this._clear();

		// DOES => Inserts markup var into recipe container (.recipe) HMTL, rendering the recipe
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	// FUNCTIONALITY => Empties recipe container before inserting markup above
	_clear() {
		this._parentElement.innerHTML = "";
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
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//////////////////////////////// RENDER ERROR
	// FUNCTIONALITY => Displays error message, using #errorMessage as default
	renderError(message = this._errorMessage) {
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
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//////////////////////////////// RENDER MESSAGE
	// FUNCTIONALITY => Displays  message, using #message as default
	renderMessage(message = this._message) {
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
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}

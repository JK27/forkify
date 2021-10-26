///////////////////////////////////////////////////////////////////// IMPORTS
import View from "./view";
import icons from "../../img/icons.svg"; // DOES => Imports icons to be used in markup

///////////////////////////////////////////////////////////////////// RESULTS VIEW
class ResultsView extends View {
	//////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".results");
	_errorMessage = "No results found. Please try another search.";
	_message = "";

	//////////////////////////////////////////////////// GENERATE MARKUP
	// FUNCTIONALITY => Generates markup getting data from search results and looping through all of them
	_generateMarkup() {
		console.log(this._data);
		return this._data.map(this._generateMarkupPreview).join("");
	}

	//////////////////////////////////////////////////// GENERATE MARKUP PREVIEW
	_generateMarkupPreview(result) {
		return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Preview" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
	}
}

export default new ResultsView();

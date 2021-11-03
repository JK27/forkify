///////////////////////////////////////////////////////////////////// IMPORTS
import View from "./view";
import previewView from "./previewView";

///////////////////////////////////////////////////////////////////// RESULTS VIEW
class ResultsView extends View {
	//////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".results");
	_errorMessage = "No results found. Please try another search.";
	_message = "";

	//////////////////////////////////////////////////// GENERATE MARKUP
	// FUNCTIONALITY => Generates markup getting data from search results and looping through all of them
	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join("");
	}

	//////////////////////////////////////////////////// GENERATE MARKUP PREVIEW
	_generateMarkup() {
		return this._data.map(result => previewView.render(result, false)).join("");
	}
}

export default new ResultsView();

///////////////////////////////////////////////////////////////////// IMPORTS
import View from "./view";
import previewView from "./previewView";

///////////////////////////////////////////////////////////////////// BOOKMARKS VIEW
class BookmarksView extends View {
	//////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMessage = "No bookmarks yet. Find a recipe that you like.";
	_message = "";

	//////////////////////////////////////////////////// ADD HANDLER RENDER
	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	//////////////////////////////////////////////////// GENERATE MARKUP
	// FUNCTIONALITY => Generates markup getting data from bookmarks and looping through all of them
	_generateMarkup() {
		return this._data
			.map(bookmark => previewView.render(bookmark, false))
			.join("");
	}
}

export default new BookmarksView();

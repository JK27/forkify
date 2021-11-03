///////////////////////////////////////////////////////////////////// IMPORTS
import View from "./view";
import icons from "../../img/icons.svg"; // DOES => Imports icons to be used in markup

///////////////////////////////////////////////////////////////////// PAGINATION VIEW
class AddRecipeView extends View {
	//////////////////////////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".upload");
	_message = "Recipe successfully uploaded";

	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	//////////////////////////////////////////////////// CONSTRUCTOR
	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}

	//////////////////////////////////////////////////// TOGGLE WINDOW
	toggleWindow() {
		this._overlay.classList.toggle("hidden");
		this._window.classList.toggle("hidden");
	}

	//////////////////////////////// ADD HANDLER SHOW WINDOW
	_addHandlerShowWindow() {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	//////////////////////////////// ADD HANDLER HIDE WINDOW
	_addHandlerHideWindow() {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this._overlay.addEventListener("click", this.toggleWindow.bind(this));
	}

	//////////////////////////////////////////////////// ADD HANDLER UPLOAD
	addHandlerUpload(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);
			handler(data);
		});
	}

	//////////////////////////////////////////////////// GENERATE MARKUP
	_generateMarkup() {}
}

export default new AddRecipeView();

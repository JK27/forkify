///////////////////////////////////////////////////////////////////// IMPORTS
import View from "./view";
import icons from "../../img/icons.svg"; // DOES => Imports icons to be used in markup

///////////////////////////////////////////////////////////////////// PAGINATION VIEW
class PaginationView extends View {
	//////////////////////////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".pagination");

	//////////////////////////////////////////////////// ADD HANDLER CLICK
	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");

			if (!btn) return;

			const goToPage = +btn.dataset.goto;

			handler(goToPage);
		});
	}

	//////////////////////////////////////////////////// GENERATE MARKUP
	_generateMarkup() {
		const currPage = this._data.page;
		// DOES => Calculates number of pages dividing the number of search results by the number of resutls per page and rounding the result up to the next integer
		const numPages = Math.ceil(
			this._data.results.length / this._data.resultsPerPage
		);

		// FUNCTIONALITY => First page and there are mor pages
		// DOES => If current page equals 1, and the total number of pages is greater than 1; it means we are on the first page. Therefore, only display the next page button
		if (currPage === 1 && numPages > 1) {
			return this._generateMarkupBtn("next", currPage);
		}

		// FUNCTIONALITY => Last page
		// DOES => If current page equals total number of pages, and the total number of pages is greater than 1; it means we are on the last page. Therefore, only display the previous page button
		if (currPage === numPages && numPages > 1) {
			return this._generateMarkupBtn("prev", currPage);
		}

		// FUNCTIONALITY => Middle pages
		// DOES => If current page is lower than total number of pages; it means we are on a middle page. Therefore, display both the previous and the next page buttons
		if (currPage < numPages) {
			return `${this._generateMarkupBtn(
				"next",
				currPage
			)}${this._generateMarkupBtn("prev", currPage)}
      `;
		}
		// FUNCTIONALITY => First page and NO more pages
		// DOES => If nothing of the above applies; it means that we are on the first and only page. Therefore, display no buttons
		return "";
	}

	//////////////////////////////////////////////////// GENERATE MARKUP BUTTONS
	_generateMarkupBtn(direction, currPage) {
		return `
      <button data-goto="${
				direction === "next" ? currPage + 1 : currPage - 1
			}" class="btn--inline pagination__btn--${direction}">
        ${direction === "next" ? `<span>Page ${currPage + 1}</span>` : ""}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
			direction === "next" ? "right" : "left"
		}"></use>
        </svg>
        ${direction === "prev" ? `<span>Page ${currPage - 1}</span>` : ""}
      </button>
    `;
	}
}

export default new PaginationView();

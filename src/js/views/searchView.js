///////////////////////////////////////////////////////////////////// SEARCH VIEW
class SearchView {
	//////////////////////////////////////////////////// PROTECTED METHODS
	_parentElement = document.querySelector(".search");

	//////////////////////////////////////////////////// GET QUERY
	// FUNCTIONALITY => Gets value from search input field and returns the query
	getQuery() {
		const query = this._parentElement.querySelector(".search__field").value;
		this._clearInput();
		return query;
	}

	//////////////////////////////////////////////////// CLEAR INPUT
	// FUNCTIONALITY => Clears search input field after submission
	_clearInput() {
		this._parentElement.querySelector(".search__field").value = "";
	}

	//////////////////////////////////////////////////// SEARCH EVENT HANDLER
	// FUNCTIONALITY => Listens for search form submission and returns search results
	addHandlerSearch(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			// DOES => Prevents page from reloading
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();

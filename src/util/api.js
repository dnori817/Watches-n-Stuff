export default {
	BASE_PATH: "/api",

	/**
	 * Fires a request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - A set of options for the request
	 * @param {string} options.method - GET, POST, PUT, or DELETE
	 * @param {object} options.args - Object of arguments to send
	 * @param {object} options.headers - Any additional headers to send
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	request(path, options) {
		// Setup some defaults
		const method = options.method ? options.method.toUpperCase() : "GET";
		let body = null;
		let query = "";
		const headers = {
			accept: "application/json",
			...options.headers || {},
		};

		if (method === "POST" || method === "PUT") {
			// For POST and PUTs, send args as JSON body
			body = JSON.stringify(options.args);
			headers["Content-Type"] = "application/json";
		}
		else if (options.args) {
			// For anything else, send args as query params
			query = "?" + Object.keys(options.args).map((key) => {
				return `${encodeURIComponent(key)}=${encodeURIComponent(options.args[key])}`;
			}).join("&");
		}

		// Construct and return the fetch
		return fetch(this.BASE_PATH + path + query, {
			method,
			headers,
			body,
			credentials: "include",
		}).then((res) => {
			return res.json();
		}).catch((err) => {
			console.error("Uncaught error:", err);
		});
	},

	/**
	 * Fires a GET request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	get(path, options) {
		return this.request(path, { ...options, method: "GET" });
	},

	/**
	 * Fires a POST request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	post(path, options) {
		return this.request(path, { ...options, method: "POST" });
	},

	/**
	 * Fires a PUT request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	put(path, options) {
		return this.request(path, { ...options, method: "PUT" });
	},

	/**
	 * Fires a DELETE request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	delete(path, options) {
		return this.request(path, { ...options, method: "DELETE" });
	},
};

import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

///////////////////////////////////////////////// TIMEOUT FUNC
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

///////////////////////////////////////////////// GETJSON FUNC
export const getJSON = async function (url) {
	try {
		// DOES => Sends request to API for a specific recipe ID. If sucess before timeout, returns page. Otherwise, returns timeout error.
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

		// DOES => Converts the response gotten form the API to JSON format
		const data = await res.json();

		// DOES => If Response ok is false, throw a new error with the message coming from the message property on the data and the status code
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		// console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Main routes for getting all companies, and jobs

	/**
	 *
	 * Main GET method to backend /companies route.
	 *
	 * Returns array of objects which contains each company information extracted from the 'companies' JSON property.
	 *
	 * [ { handle, name, description, numEmployees, logoUrl }, ...]
	 *
	 */
	static async getAllCompanies() {
		const res = await this.request(`companies`);
		return res.companies;
	}

	/**
	 *
	 * GET method to backend /companies route for searching all entries.
	 *
	 * Returns array of objects that contains company names that are similar to the search query from frontend. Contains each company information extracted from the 'companies' JSON property.
	 *
	 * [ { handle, name, description, numEmployees, logoUrl }, ...]
	 *
	 */
	static async searchCompanies(query) {
		const res = await this.request(`companies?name=${query}`);
		return res.companies;
	}

	/**
	 *
	 * Main GET method to backend /jobs route.
	 *
	 * Returns array of objects which contains all job information extracted from the 'jobs' JSON property.
	 *
	 * [ { id, title, salary, equity, companyHandle, companyName }, ...]
	 *
	 */

	static async getAllJobs() {
		let res = await this.request(`jobs`);
		return res.jobs;
	}

	/**
	 * GET company by /:handle.
	 *
	 * makes request to backend /companies/:handle route where :handle is extracted from URL parameters based on frontend request.
	 *
	 * returns invididual {company} object where object is { handle, name, description, numEmployees, logoUrl, jobs }
	 * 	and {jobs} is [{ id, title, salary, equity }, ...]
	 *
	 */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/**
	 * GET individual job by /:id.
	 *
	 * makes request to backend /jobs/:id route where :id is extracted from URL parameters based on frontend request.
	 *
	 * returns invididual {job} object where object is { id, title, salary, equity, {company }}
	 * 	and {company} is { handle, name, description, numEmployees, logoUrl }
	 *
	 */

	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		return res.job;
	}

	// Individual API routes

	/**
	 *
	 * Authenticating new user (loggin in) and returning object which contains token along with user appliactions from backend.
	 *
	 * POST request to /auth/token where {data} is {username,  password} and method is 'post'
	 *
	 * JoblyApi.token value is set to token received for future user requests from frontend.
	 *
	 * return {token, applications} where applications is [id, id, id, ...]
	 *
	 *
	 */

	static async authenticateUser(data) {
		let res = await this.request(`auth/token`, data, "post");
		JoblyApi.token = res.token;
		let apps = await this.request(`users/${data.username}`);
		console.log(apps);
		return { token: res.token, applications: apps.user.applications };
	}

	/**
	 *
	 * Creating new user (registering) with information received from frontend form.
	 *
	 * POST request to /auth/register where {data} is {username, password, firstName, lastName, email} and method is 'post'
	 *
	 * JoblyApi.token value is set to token received for future user requests from frontend.
	 *
	 * return {token}
	 */

	static async registerNewUser(data) {
		let res = await this.request(`auth/register`, data, "post");
		JoblyApi.token = res.token;
		return res;
	}

	/**
	 *
	 * Get details on an individual user by their username
	 *
	 * GET request to /users/:username route where :username is extracted from frontend request and token is the curernt user's token saved to localStorage for authentication.
	 *
	 * JobliApi.token is set to the value of the received token for verification through JWT.
	 *
	 * Return {user} object where object is { username, firstName, lastName, isAdmin, applications }
	 * 	where applications is [id, id, id, ...]
	 *
	 *  */

	static async getUser(username, token) {
		JoblyApi.token = token;
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/**
	 *
	 * Update information for individual user.
	 *
	 * PATCH request to /users/:username where :username is extracted from frontend request and token is the curernt user's token saved to localStorage for authentication.
	 *
	 * Where {data} can include { firstName, lastName, password, email } DOES NOT NEED ALL VALUES.
	 *
	 * JobliApi.token is set to the value of the received token for verification through JWT.
	 *
	 * Returns { username, firstName, lastName, email, isAdmin }
	 *
	 */
	static async updateUser(username, data, token) {
		JoblyApi.token = token;
		let res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}

	// method for deleting a user CURRENTLY DISABLED.
	// static async deleteUser(username) {
	// 	let res = await this.request(`users/${username}`, {}, "delete");
	// 	return res.user;
	// }

	/**
	 *
	 * Apply to a single job id from for a specific username
	 *
	 * POST request to /users/:username/jobs/:id where :username and :id are extracted from frontend request and token is the curernt user's token saved to localStorage for authentication.
	 *
	 * Returns {"applied": jobId}
	 *
	 */

	static async applyToJob(username, jobId, token) {
		JoblyApi.token = token;
		let res = await this.request(
			`users/${username}/jobs/${jobId}`,
			{},
			"post"
		);
		return res;
	}
}

export default JoblyApi;

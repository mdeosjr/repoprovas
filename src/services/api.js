import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

function createConfig(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

async function createUser(user) {
	return await axios.post(`${BASE_URL}/users/create`, user);
}

async function login(data) {
	const token = await axios.post(`${BASE_URL}/login`, data);
	return token;
}

async function logout(token) {
	const config = createConfig(token);
	return axios.post(`${BASE_URL}/logout`, {}, config);
}

async function getTeachersContent(token) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/teachers`, config);
}

async function getTermsContent(token) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/terms`, config);
}

const api = {
	createUser,
	login,
	logout,
	getTeachersContent,
	getTermsContent,
};

export default api;

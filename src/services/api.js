import axios from 'axios';

//const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://repoprovas-ts-api.herokuapp.com';

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

async function validateToken(token) {
	const config = createConfig(token);
	return axios.post(`${BASE_URL}/token`, {}, config);
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
	validateToken,
	getTeachersContent,
	getTermsContent,
};

export default api;

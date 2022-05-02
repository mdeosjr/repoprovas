import axios from 'axios';

//const BASE_URL = 'https://repoprovas-ts-api.herokuapp.com';
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

async function getDisciplinesList(token) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/disciplines`, config);
}

async function getDisciplinesContent(token, name) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/discipline/${name}`, config);
}

async function getDisciplinesContentById(token, id) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/disciplines/${id}`, config);
}

async function getCategoriesList(token) {
	const config = createConfig(token);
	return axios.get(`${BASE_URL}/content/categories`, config);
}

async function sendData(token, data) {
	const config = createConfig(token);
	return axios.post(`${BASE_URL}/tests/create`, data, config);
}

const api = {
	createUser,
	login,
	validateToken,
	getTeachersContent,
	getTermsContent,
	getDisciplinesContent,
	getDisciplinesContentById,
	getDisciplinesList,
	getCategoriesList,
	sendData,
};

export default api;

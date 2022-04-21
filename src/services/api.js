import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

function createConfig(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}
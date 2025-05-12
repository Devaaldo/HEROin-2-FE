import axios from "axios";

// Base URL untuk API
const API_BASE_URL = "http://localhost:5000/api";

// Membuat instance axios
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const userService = {
	// Membuat pengguna baru
	createUser: async (userData) => {
		try {
			const response = await api.post("/users/", userData);
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat membuat pengguna");
		}
	},

	// Mendapatkan semua pengguna
	getAllUsers: async () => {
		try {
			const response = await api.get("/users/");
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil data pengguna");
		}
	},

	// Mendapatkan pengguna berdasarkan ID
	getUserById: async (userId) => {
		try {
			const response = await api.get(`/users/${userId}`);
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil data pengguna");
		}
	},
};

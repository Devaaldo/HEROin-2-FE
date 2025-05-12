export const diagnosisService = {
	// Mendapatkan semua hipotesis
	getAllHypotheses: async () => {
		try {
			const response = await api.get("/diagnosis/hypotheses");
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil hipotesis");
		}
	},

	// Mendapatkan hipotesis berdasarkan ID
	getHypothesisById: async (hypothesisId) => {
		try {
			const response = await api.get(`/diagnosis/hypotheses/${hypothesisId}`);
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil hipotesis");
		}
	},

	// Mendapatkan gejala untuk hipotesis tertentu
	getSymptomsForHypothesis: async (hypothesisId) => {
		try {
			const response = await api.get(
				`/diagnosis/hypotheses/${hypothesisId}/symptoms`
			);
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil gejala");
		}
	},

	// Mendapatkan semua gejala
	getAllSymptoms: async () => {
		try {
			const response = await api.get("/diagnosis/symptoms");
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil gejala");
		}
	},

	// Menyimpan jawaban pengguna
	saveUserAnswers: async (userId, answers) => {
		try {
			const response = await api.post("/diagnosis/answers", {
				user_id: userId,
				answers: answers,
			});
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat menyimpan jawaban");
		}
	},

	// Melakukan diagnosis
	diagnose: async (userId, hypothesisId, answers) => {
		try {
			const response = await api.post("/diagnosis/diagnose", {
				user_id: userId,
				hypothesis_id: hypothesisId,
				answers: answers,
			});
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat melakukan diagnosis");
		}
	},

	// Mendapatkan hasil diagnosis
	getDiagnosisResults: async (userId = null) => {
		try {
			const url = userId
				? `/diagnosis/results?user_id=${userId}`
				: "/diagnosis/results";
			const response = await api.get(url);
			return response.data;
		} catch (error) {
			throw error.response
				? error.response.data
				: new Error("Terjadi kesalahan saat mengambil hasil diagnosis");
		}
	},
};

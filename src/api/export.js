export const exportService = {
	// Mendapatkan URL untuk mengunduh Excel
	getExcelExportUrl: () => {
		return `${API_BASE_URL}/export/excel`;
	},

	// Mendapatkan URL untuk mengunduh PDF
	getPdfExportUrl: () => {
		return `${API_BASE_URL}/export/pdf`;
	},

	// Mengunduh file Excel
	downloadExcel: async () => {
		try {
			window.open(`${API_BASE_URL}/export/excel`);
		} catch (error) {
			throw new Error("Terjadi kesalahan saat mengunduh file Excel");
		}
	},

	// Mengunduh file PDF
	downloadPdf: async () => {
		try {
			window.open(`${API_BASE_URL}/export/pdf`);
		} catch (error) {
			throw new Error("Terjadi kesalahan saat mengunduh file PDF");
		}
	},
};

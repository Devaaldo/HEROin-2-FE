import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
	FiDownload,
	FiInfo,
	FiRefreshCw,
	FiArrowLeft,
	FiFileText,
	FiPieChart,
} from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useDiagnosis } from "../contexts/DiagnosisContext";
import { exportService } from "../api/export";

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	const navigate = useNavigate();
	const { userId, userData, selectedHypothesis, diagnosisResult, resetState } =
		useDiagnosis();

	const [isExporting, setIsExporting] = useState(false);

	// Memeriksa apakah ada hasil diagnosis
	useEffect(() => {
		if (!userId || !diagnosisResult) {
			toast.warn(
				"Belum ada hasil diagnosis. Silakan lakukan diagnosis terlebih dahulu"
			);
			navigate("/identity");
		}
	}, [userId, diagnosisResult, navigate]);

	const handleExportExcel = async () => {
		try {
			setIsExporting(true);
			await exportService.downloadExcel();
			toast.success("Berhasil mengunduh data dalam format Excel");
		} catch (error) {
			console.error("Error exporting to Excel:", error);
			toast.error("Terjadi kesalahan saat mengunduh data Excel");
		} finally {
			setIsExporting(false);
		}
	};

	const handleExportPdf = async () => {
		try {
			setIsExporting(true);
			await exportService.downloadPdf();
			toast.success("Berhasil mengunduh data dalam format PDF");
		} catch (error) {
			console.error("Error exporting to PDF:", error);
			toast.error("Terjadi kesalahan saat mengunduh data PDF");
		} finally {
			setIsExporting(false);
		}
	};

	const handleStartAgain = () => {
		resetState();
		navigate("/identity");
	};

	// Jika tidak ada hasil diagnosis, tampilkan pesan
	if (!diagnosisResult) {
		return (
			<div className="page-container">
				<div className="flex justify-center items-center min-h-[60vh]">
					<div className="text-center">
						<div className="text-gray-400 text-5xl mb-4">📊</div>
						<h2 className="text-2xl font-bold text-dark mb-2">
							Belum Ada Hasil
						</h2>
						<p className="text-gray-600 mb-6">
							Anda belum melakukan diagnosis kecanduan game online
						</p>
						<button
							onClick={() => navigate("/identity")}
							className="btn-primary"
						>
							Mulai Diagnosis
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Membuat data untuk chart
	const chartData = {
		labels: ["Keyakinan Diagnosis", "Ketidakyakinan"],
		datasets: [
			{
				label: "Persentase Keyakinan",
				data: [diagnosisResult.percentage, 100 - diagnosisResult.percentage],
				backgroundColor: ["#9630FB", "#E0E0E0"],
				borderColor: ["#9630FB", "#E0E0E0"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="page-container">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl mx-auto"
			>
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-dark mb-2">Hasil Diagnosis</h1>
					<p className="text-gray-600">
						Berikut adalah hasil diagnosis kecanduan game online berdasarkan
						jawaban Anda.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-custom p-6"
					>
						<h2 className="text-xl font-semibold text-dark mb-4">
							Detail Hasil
						</h2>

						<div className="space-y-4">
							<div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
								<h3 className="font-medium text-dark">Identitas</h3>
								<div className="grid grid-cols-2 gap-2 mt-2">
									<div>
										<p className="text-sm text-gray-500">Nama</p>
										<p className="font-medium">{userData.nama_lengkap}</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">Usia</p>
										<p className="font-medium">{userData.usia} tahun</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">Program Studi</p>
										<p className="font-medium">{userData.program_studi}</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">Angkatan</p>
										<p className="font-medium">{userData.angkatan}</p>
									</div>
								</div>
							</div>

							<div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
								<h3 className="font-medium text-dark">Diagnosis</h3>
								<div className="mt-2">
									<div className="mb-2">
										<p className="text-sm text-gray-500">Tingkat Kecanduan</p>
										<p className="font-semibold text-primary">
											{diagnosisResult.hypothesis.nama}
										</p>
									</div>
									<div className="mb-2">
										<p className="text-sm text-gray-500">Tingkat Keyakinan</p>
										<div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
											<div
												className="bg-primary h-2.5 rounded-full"
												style={{ width: `${diagnosisResult.percentage}%` }}
											></div>
										</div>
										<p className="text-right text-sm font-medium mt-1">
											{diagnosisResult.percentage.toFixed(2)}%
										</p>
									</div>
								</div>
							</div>

							<div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
								<h3 className="font-medium text-dark mb-2">Deskripsi</h3>
								<p className="text-gray-600 text-sm">
									{diagnosisResult.hypothesis.deskripsi}
								</p>
							</div>

							<div className="p-4 border border-primary border-opacity-20 rounded-lg bg-primary bg-opacity-5">
								<div className="flex items-start">
									<FiInfo className="text-primary text-xl mr-3 flex-shrink-0 mt-0.5" />
									<div>
										<h3 className="font-medium text-dark mb-2">
											Solusi & Rekomendasi
										</h3>
										<p className="text-gray-600 text-sm">
											{diagnosisResult.hypothesis.solusi}
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="col-span-1 bg-white rounded-xl shadow-custom p-6"
					>
						<h2 className="text-xl font-semibold text-dark mb-4 flex items-center">
							<FiPieChart className="mr-2 text-primary" /> Visualisasi
						</h2>

						<div className="relative h-48 mt-4">
							<Doughnut
								data={chartData}
								options={{
									responsive: true,
									maintainAspectRatio: false,
									cutout: "70%",
									plugins: {
										legend: {
											position: "bottom",
											labels: {
												font: {
													size: 12,
												},
											},
										},
									},
								}}
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<p className="text-2xl font-bold text-primary">
										{diagnosisResult.percentage.toFixed(0)}%
									</p>
									<p className="text-xs text-gray-500">Keyakinan</p>
								</div>
							</div>
						</div>

						<div className="mt-6 space-y-3">
							<button
								onClick={handleExportExcel}
								disabled={isExporting}
								className="w-full py-2 px-4 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
							>
								<FiDownload className="mr-2" /> Unduh Excel
							</button>

							<button
								onClick={handleExportPdf}
								disabled={isExporting}
								className="w-full py-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
							>
								<FiFileText className="mr-2" /> Unduh PDF
							</button>
						</div>
					</motion.div>
				</div>

				<div className="flex justify-between">
					<motion.button
						onClick={() => navigate("/questionnaire")}
						className="btn-secondary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
					>
						<FiArrowLeft className="mr-2" /> Kembali
					</motion.button>

					<motion.button
						onClick={handleStartAgain}
						className="btn-primary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
					>
						<FiRefreshCw className="mr-2" /> Mulai Lagi
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;

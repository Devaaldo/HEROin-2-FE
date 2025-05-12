import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiInfo, FiArrowRight, FiArrowLeft } from "react-icons/fi";

import { useDiagnosis } from "../contexts/DiagnosisContext";
import { diagnosisService } from "../api/diagnosis";

const Hypothesis = () => {
	const navigate = useNavigate();
	const { userId, selectedHypothesis, selectHypothesis } = useDiagnosis();

	const [hypotheses, setHypotheses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Efek animasi
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5 },
		},
	};

	// Mendapatkan daftar hipotesis
	useEffect(() => {
		const fetchHypotheses = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await diagnosisService.getAllHypotheses();
				setHypotheses(data);
			} catch (error) {
				console.error("Error fetching hypotheses:", error);
				setError("Terjadi kesalahan saat mengambil data hipotesis");
				toast.error(
					"Terjadi kesalahan saat mengambil data. Silakan coba lagi."
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchHypotheses();
	}, []);

	// Memeriksa apakah pengguna telah mengisi identitas
	useEffect(() => {
		if (!userId) {
			toast.warn("Silakan isi data identitas terlebih dahulu");
			navigate("/identity");
		}
	}, [userId, navigate]);

	const handleSelectHypothesis = (hypothesis) => {
		selectHypothesis(hypothesis);
	};

	const handleNext = () => {
		if (!selectedHypothesis) {
			toast.warn("Silakan pilih salah satu hipotesis terlebih dahulu");
			return;
		}

		navigate("/questionnaire");
	};

	if (isLoading) {
		return (
			<div className="page-container">
				<div className="flex justify-center items-center min-h-[60vh]">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
						<p className="text-gray-600">Memuat data hipotesis...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="page-container">
				<div className="flex justify-center items-center min-h-[60vh]">
					<div className="text-center">
						<div className="text-red-500 text-5xl mb-4">😕</div>
						<h2 className="text-2xl font-bold text-dark mb-2">
							Terjadi Kesalahan
						</h2>
						<p className="text-gray-600 mb-6">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="btn-primary"
						>
							Coba Lagi
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl mx-auto"
			>
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-dark mb-2">Pilih Hipotesis</h1>
					<p className="text-gray-600">
						Pilih tingkat kecanduan yang ingin Anda periksa berdasarkan
						kebiasaan bermain game Anda.
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-custom p-6 md:p-8 mb-8">
					<div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6">
						<FiInfo className="text-blue-500 text-xl mr-3 flex-shrink-0" />
						<p className="text-blue-700 text-sm">
							Pilih salah satu tingkat kecanduan berikut untuk melanjutkan
							proses diagnosis. Sistem akan menanyakan beberapa pertanyaan
							terkait dengan tingkat kecanduan yang Anda pilih.
						</p>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-4"
					>
						{hypotheses.map((hypothesis) => (
							<motion.div
								key={hypothesis.id}
								variants={itemVariants}
								onClick={() => handleSelectHypothesis(hypothesis)}
								className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
									selectedHypothesis && selectedHypothesis.id === hypothesis.id
										? "border-primary bg-primary bg-opacity-5"
										: "border-gray-200 hover:border-primary hover:bg-gray-50"
								}`}
							>
								<div className="flex items-start">
									<div
										className={`w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0 ${
											selectedHypothesis &&
											selectedHypothesis.id === hypothesis.id
												? "border-primary bg-primary"
												: "border-gray-400"
										}`}
									>
										{selectedHypothesis &&
											selectedHypothesis.id === hypothesis.id && (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className="w-2 h-2 bg-white rounded-full m-auto"
												/>
											)}
									</div>

									<div className="ml-3 flex-grow">
										<h3 className="text-lg font-semibold text-dark">
											{hypothesis.nama}
										</h3>
										<p className="text-gray-600 mt-1">{hypothesis.deskripsi}</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				<div className="flex justify-between">
					<motion.button
						onClick={() => navigate("/identity")}
						className="btn-secondary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
					>
						<FiArrowLeft className="mr-2" /> Kembali
					</motion.button>

					<motion.button
						onClick={handleNext}
						className="btn-primary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
					>
						Lanjutkan <FiArrowRight className="ml-2" />
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Hypothesis;

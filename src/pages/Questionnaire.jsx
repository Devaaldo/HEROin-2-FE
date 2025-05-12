import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
	FiInfo,
	FiArrowRight,
	FiArrowLeft,
	FiHelpCircle,
} from "react-icons/fi";

import { useDiagnosis } from "../contexts/DiagnosisContext";
import { diagnosisService } from "../api/diagnosis";

const Questionnaire = () => {
	const navigate = useNavigate();
	const {
		userId,
		selectedHypothesis,
		userAnswers,
		saveUserAnswers,
		saveDiagnosisResult,
	} = useDiagnosis();

	const [symptoms, setSymptoms] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const certaintyValues = [
		{ value: 1.0, label: "Sangat yakin" },
		{ value: 0.8, label: "Yakin" },
		{ value: 0.6, label: "Cukup yakin" },
		{ value: 0.4, label: "Hampir yakin" },
		{ value: 0.2, label: "Kurang yakin" },
		{ value: 0.0, label: "Tidak yakin" },
	];

	// Efek animasi
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.3 },
		},
	};

	// Memeriksa apakah pengguna telah memilih hipotesis
	useEffect(() => {
		if (!userId) {
			toast.warn("Silakan isi data identitas terlebih dahulu");
			navigate("/identity");
			return;
		}

		if (!selectedHypothesis) {
			toast.warn("Silakan pilih hipotesis terlebih dahulu");
			navigate("/hypothesis");
			return;
		}
	}, [userId, selectedHypothesis, navigate]);

	// Mendapatkan gejala untuk hipotesis yang dipilih
	useEffect(() => {
		const fetchSymptoms = async () => {
			try {
				setIsLoading(true);
				setError(null);

				if (!selectedHypothesis) return;

				const data = await diagnosisService.getSymptomsForHypothesis(
					selectedHypothesis.id
				);
				setSymptoms(data);

				// Inisialisasi jawaban
				const initialAnswers = data.map((symptom) => ({
					symptom_id: symptom.id,
					nilai_keyakinan:
						userAnswers.find((a) => a.symptom_id === symptom.id)
							?.nilai_keyakinan || 0,
				}));

				setAnswers(initialAnswers);
			} catch (error) {
				console.error("Error fetching symptoms:", error);
				setError("Terjadi kesalahan saat mengambil data gejala");
				toast.error(
					"Terjadi kesalahan saat mengambil data. Silakan coba lagi."
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSymptoms();
	}, [selectedHypothesis, userAnswers]);

	const handleAnswerChange = (symptomId, value) => {
		setAnswers((prevAnswers) =>
			prevAnswers.map((answer) =>
				answer.symptom_id === symptomId
					? { ...answer, nilai_keyakinan: parseFloat(value) }
					: answer
			)
		);
	};

	const validateAnswers = () => {
		const unansweredQuestions = answers.filter(
			(answer) =>
				answer.nilai_keyakinan === undefined || answer.nilai_keyakinan === null
		);
		return unansweredQuestions.length === 0;
	};

	const handleSubmit = async () => {
		if (!validateAnswers()) {
			toast.warn("Silakan jawab semua pertanyaan terlebih dahulu");
			return;
		}

		setIsSubmitting(true);

		try {
			// Simpan jawaban ke context
			saveUserAnswers(answers);

			// Simpan jawaban ke backend
			await diagnosisService.saveUserAnswers(userId, answers);

			// Lakukan diagnosis
			const result = await diagnosisService.diagnose(
				userId,
				selectedHypothesis.id,
				answers
			);

			// Simpan hasil diagnosis ke context
			saveDiagnosisResult(result);

			// Pindah ke halaman dashboard
			navigate("/dashboard");
		} catch (error) {
			console.error("Error submitting answers:", error);
			toast.error(
				error.message ||
					"Terjadi kesalahan saat memproses jawaban. Silakan coba lagi."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="page-container">
				<div className="flex justify-center items-center min-h-[60vh]">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
						<p className="text-gray-600">Memuat pertanyaan...</p>
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
					<h1 className="text-3xl font-bold text-dark mb-2">Kuesioner</h1>
					<p className="text-gray-600">
						Jawab pertanyaan berikut sesuai dengan kondisi Anda untuk
						mendiagnosis tingkat kecanduan game online.
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-custom p-6 md:p-8 mb-8">
					<div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6">
						<FiInfo className="text-blue-500 text-xl mr-3 flex-shrink-0" />
						<p className="text-blue-700 text-sm">
							Pilih tingkat keyakinan Anda untuk setiap pernyataan berikut.
							Semakin yakin Anda mengalami gejala tersebut, semakin tinggi nilai
							yang harus Anda pilih.
						</p>
					</div>

					<div className="mb-6">
						<h3 className="text-xl font-semibold text-primary mb-1">
							{selectedHypothesis.nama}
						</h3>
						<p className="text-gray-600 text-sm">
							{selectedHypothesis.deskripsi}
						</p>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-8"
					>
						{symptoms.map((symptom, index) => (
							<motion.div
								key={symptom.id}
								variants={itemVariants}
								className="p-5 rounded-lg border border-gray-200 bg-gray-50"
							>
								<div className="flex items-start mb-4">
									<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium flex-shrink-0">
										{index + 1}
									</div>
									<div className="ml-3">
										<h4 className="font-medium text-dark">{symptom.gejala}</h4>
									</div>
								</div>

								<div className="ml-11">
									<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
										{certaintyValues.map((item) => (
											<div key={item.value} className="flex items-center">
												<input
													type="radio"
													id={`symptom_${symptom.id}_value_${item.value}`}
													name={`symptom_${symptom.id}`}
													value={item.value}
													checked={
														answers.find((a) => a.symptom_id === symptom.id)
															?.nilai_keyakinan === item.value
													}
													onChange={() =>
														handleAnswerChange(symptom.id, item.value)
													}
													className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
												/>
												<label
													htmlFor={`symptom_${symptom.id}_value_${item.value}`}
													className="ml-2 text-gray-700 text-sm"
												>
													{item.label}
												</label>
											</div>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				<div className="flex justify-between">
					<motion.button
						onClick={() => navigate("/hypothesis")}
						className="btn-secondary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
						disabled={isSubmitting}
					>
						<FiArrowLeft className="mr-2" /> Kembali
					</motion.button>

					<motion.button
						onClick={handleSubmit}
						className="btn-primary inline-flex items-center"
						whileTap={{ scale: 0.95 }}
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
								Memproses...
							</>
						) : (
							<>
								Lihat Hasil <FiArrowRight className="ml-2" />
							</>
						)}
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Questionnaire;

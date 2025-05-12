import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
	FiUser,
	FiCalendar,
	FiBookOpen,
	FiMapPin,
	FiUsers,
	FiArrowRight,
	FiInfo,
	FiAlertCircle,
} from "react-icons/fi";

import { useDiagnosis } from "../contexts/DiagnosisContext";
import { userService } from "../api/user";
import LoadingButton from "../components/LoadingButton";

// Opsi untuk program studi
const PROGRAM_STUDI_OPTIONS = [
	"Teknik Informatika",
	"Sistem Informasi",
	"Ilmu Komputer",
	"Teknik Elektro",
	"Teknik Mesin",
	"Manajemen",
	"Akuntansi",
	"Psikologi",
	"Kedokteran",
	"Farmasi",
	"Hukum",
	"Ilmu Komunikasi",
	"Sastra",
	"Lainnya",
];

// Opsi untuk angkatan
const CURRENT_YEAR = new Date().getFullYear();
const ANGKATAN_OPTIONS = Array.from({ length: 10 }, (_, i) =>
	(CURRENT_YEAR - i).toString()
);

const UserIdentity = () => {
	const navigate = useNavigate();
	const { userData, saveUserData, saveUserId } = useDiagnosis();

	const [formData, setFormData] = useState({
		nama_lengkap: userData.nama_lengkap || "",
		usia: userData.usia || "",
		angkatan: userData.angkatan || "",
		program_studi: userData.program_studi || "",
		domisili: userData.domisili || "",
		jenis_kelamin: userData.jenis_kelamin || "",
	});

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showOtherProgramStudi, setShowOtherProgramStudi] = useState(false);
	const [customProgramStudi, setCustomProgramStudi] = useState("");

	// Efek untuk menentukan jika program studi adalah "Lainnya"
	useEffect(() => {
		if (formData.program_studi === "Lainnya") {
			setShowOtherProgramStudi(true);
		} else {
			setShowOtherProgramStudi(false);
		}
	}, [formData.program_studi]);

	// Handler untuk mengubah nilai form
	const handleChange = (e) => {
		const { name, value } = e.target;

		// Validasi untuk usia (hanya angka)
		if (name === "usia") {
			if (value === "" || /^\d+$/.test(value)) {
				setFormData((prev) => ({
					...prev,
					[name]: value,
				}));
			}
			return;
		}

		// Untuk field lainnya
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Tandai field sebagai sudah disentuh
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		// Hapus error untuk field yang diubah
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Handler untuk custom program studi
	const handleCustomProgramStudiChange = (e) => {
		const value = e.target.value;
		setCustomProgramStudi(value);

		// Hapus error jika ada
		if (errors.program_studi) {
			setErrors((prev) => ({
				...prev,
				program_studi: "",
			}));
		}
	};

	// Handler untuk focus (touch)
	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		// Validasi field saat blur
		validateField(name, formData[name]);
	};

	// Validasi satu field
	const validateField = (name, value) => {
		let errorMessage = "";

		switch (name) {
			case "nama_lengkap":
				if (!value.trim()) {
					errorMessage = "Nama lengkap wajib diisi";
				} else if (value.trim().length < 3) {
					errorMessage = "Nama lengkap minimal 3 karakter";
				} else if (value.trim().length > 100) {
					errorMessage = "Nama lengkap maksimal 100 karakter";
				} else if (!/^[a-zA-Z\s'.]+$/.test(value)) {
					errorMessage =
						"Nama lengkap hanya boleh berisi huruf, spasi, apostrof, dan titik";
				}
				break;

			case "usia":
				if (!value) {
					errorMessage = "Usia wajib diisi";
				} else if (
					isNaN(value) ||
					parseInt(value) < 15 ||
					parseInt(value) > 50
				) {
					errorMessage = "Usia harus berupa angka antara 15-50 tahun";
				}
				break;

			case "angkatan":
				if (!value) {
					errorMessage = "Angkatan wajib diisi";
				}
				break;

			case "program_studi":
				if (!value) {
					errorMessage = "Program studi wajib diisi";
				} else if (value === "Lainnya" && !customProgramStudi.trim()) {
					errorMessage = "Harap isi program studi";
				}
				break;

			case "domisili":
				if (!value.trim()) {
					errorMessage = "Domisili wajib diisi";
				} else if (value.trim().length < 3) {
					errorMessage = "Domisili minimal 3 karakter";
				} else if (value.trim().length > 100) {
					errorMessage = "Domisili maksimal 100 karakter";
				}
				break;

			case "jenis_kelamin":
				if (!value) {
					errorMessage = "Jenis kelamin wajib dipilih";
				}
				break;

			default:
				break;
		}

		// Update errors
		setErrors((prev) => ({
			...prev,
			[name]: errorMessage,
		}));

		return errorMessage === "";
	};

	// Validasi semua form
	const validateForm = () => {
		const fieldNames = Object.keys(formData);
		let isValid = true;

		// Validasi semua field dan tandai sebagai tersentuh
		fieldNames.forEach((name) => {
			const value = formData[name];
			const fieldIsValid = validateField(name, value);

			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (!fieldIsValid) {
				isValid = false;
			}
		});

		// Validasi khusus untuk program studi lainnya
		if (formData.program_studi === "Lainnya" && !customProgramStudi.trim()) {
			setErrors((prev) => ({
				...prev,
				program_studi: "Harap isi program studi",
			}));
			isValid = false;
		}

		return isValid;
	};

	// Handler untuk submit form
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			toast.error("Mohon lengkapi semua data dengan benar");
			return;
		}

		setIsSubmitting(true);

		try {
			// Siapkan data yang akan dikirim
			const dataToSubmit = { ...formData };

			// Jika program studi adalah "Lainnya", gunakan nilai custom
			if (formData.program_studi === "Lainnya") {
				dataToSubmit.program_studi = customProgramStudi;
			}

			// Sanitasi data
			Object.keys(dataToSubmit).forEach((key) => {
				if (typeof dataToSubmit[key] === "string") {
					dataToSubmit[key] = dataToSubmit[key].trim();
				}
			});

			// Simpan data ke context
			saveUserData(dataToSubmit);

			// Kirim data ke backend
			const response = await userService.createUser(dataToSubmit);

			// Simpan ID pengguna yang diterima dari backend
			saveUserId(response.user.id);

			toast.success("Data identitas berhasil disimpan");

			// Pindah ke halaman hipotesis
			navigate("/hypothesis");
		} catch (error) {
			console.error("Error submitting user data:", error);

			// Tampilkan pesan error yang spesifik jika ada
			if (error.message) {
				toast.error(error.message);
			} else {
				toast.error("Terjadi kesalahan. Silakan coba lagi.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	// Animasi
	const pageVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
		exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
	};

	return (
		<div className="page-container">
			<motion.div
				variants={pageVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				className="max-w-3xl mx-auto"
			>
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-dark mb-2">
						Identitas Pengguna
					</h1>
					<p className="text-gray-600">
						Lengkapi data diri Anda untuk memulai proses identifikasi kecanduan
						game online.
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-custom p-6 md:p-8">
					{/* Info box */}
					<div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6">
						<FiInfo className="text-blue-500 text-xl mr-3 flex-shrink-0" />
						<p className="text-blue-700 text-sm">
							Data yang Anda masukkan akan digunakan untuk keperluan diagnosis
							dan penelitian. Identitas Anda terjamin kerahasiaannya.
						</p>
					</div>

					<form onSubmit={handleSubmit} noValidate>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Nama Lengkap */}
							<div className="col-span-1 md:col-span-2">
								<label
									htmlFor="nama_lengkap"
									className="label flex items-center"
								>
									<FiUser className="mr-2 text-primary" /> Nama Lengkap
								</label>
								<input
									type="text"
									id="nama_lengkap"
									name="nama_lengkap"
									value={formData.nama_lengkap}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Masukkan nama lengkap"
									className={`input-field ${
										touched.nama_lengkap && errors.nama_lengkap
											? "border-red-500"
											: ""
									}`}
									autoComplete="name"
									required
								/>
								{touched.nama_lengkap && errors.nama_lengkap && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.nama_lengkap}
									</p>
								)}
							</div>

							{/* Usia */}
							<div>
								<label htmlFor="usia" className="label flex items-center">
									<FiCalendar className="mr-2 text-primary" /> Usia
								</label>
								<input
									type="text"
									inputMode="numeric"
									id="usia"
									name="usia"
									value={formData.usia}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Masukkan usia"
									className={`input-field ${
										touched.usia && errors.usia ? "border-red-500" : ""
									}`}
									required
								/>
								{touched.usia && errors.usia && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.usia}
									</p>
								)}
							</div>

							{/* Angkatan */}
							<div>
								<label htmlFor="angkatan" className="label flex items-center">
									<FiCalendar className="mr-2 text-primary" /> Angkatan
								</label>
								<select
									id="angkatan"
									name="angkatan"
									value={formData.angkatan}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`input-field ${
										touched.angkatan && errors.angkatan ? "border-red-500" : ""
									}`}
									required
								>
									<option value="" disabled>
										Pilih angkatan
									</option>
									{ANGKATAN_OPTIONS.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								{touched.angkatan && errors.angkatan && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.angkatan}
									</p>
								)}
							</div>

							{/* Program Studi */}
							<div>
								<label
									htmlFor="program_studi"
									className="label flex items-center"
								>
									<FiBookOpen className="mr-2 text-primary" /> Program Studi
								</label>
								<select
									id="program_studi"
									name="program_studi"
									value={formData.program_studi}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`input-field ${
										touched.program_studi && errors.program_studi
											? "border-red-500"
											: ""
									}`}
									required
								>
									<option value="" disabled>
										Pilih program studi
									</option>
									{PROGRAM_STUDI_OPTIONS.map((program) => (
										<option key={program} value={program}>
											{program}
										</option>
									))}
								</select>

								{/* Input untuk program studi lainnya */}
								<AnimatePresence>
									{showOtherProgramStudi && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="mt-2"
										>
											<input
												type="text"
												id="custom_program_studi"
												value={customProgramStudi}
												onChange={handleCustomProgramStudiChange}
												placeholder="Masukkan program studi"
												className={`input-field ${
													touched.program_studi &&
													errors.program_studi &&
													formData.program_studi === "Lainnya"
														? "border-red-500"
														: ""
												}`}
											/>
										</motion.div>
									)}
								</AnimatePresence>

								{touched.program_studi && errors.program_studi && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.program_studi}
									</p>
								)}
							</div>

							{/* Domisili */}
							<div>
								<label htmlFor="domisili" className="label flex items-center">
									<FiMapPin className="mr-2 text-primary" /> Domisili
								</label>
								<input
									type="text"
									id="domisili"
									name="domisili"
									value={formData.domisili}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Masukkan domisili"
									className={`input-field ${
										touched.domisili && errors.domisili ? "border-red-500" : ""
									}`}
									required
								/>
								{touched.domisili && errors.domisili && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.domisili}
									</p>
								)}
							</div>

							{/* Jenis Kelamin */}
							<div>
								<label className="label flex items-center">
									<FiUsers className="mr-2 text-primary" /> Jenis Kelamin
								</label>
								<div className="mt-2 space-y-2">
									<div className="flex items-center">
										<input
											type="radio"
											id="laki-laki"
											name="jenis_kelamin"
											value="Laki-laki"
											checked={formData.jenis_kelamin === "Laki-laki"}
											onChange={handleChange}
											onBlur={handleBlur}
											className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
											required
										/>
										<label htmlFor="laki-laki" className="ml-2 text-gray-700">
											Laki-laki
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="perempuan"
											name="jenis_kelamin"
											value="Perempuan"
											checked={formData.jenis_kelamin === "Perempuan"}
											onChange={handleChange}
											onBlur={handleBlur}
											className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
										/>
										<label htmlFor="perempuan" className="ml-2 text-gray-700">
											Perempuan
										</label>
									</div>
								</div>
								{touched.jenis_kelamin && errors.jenis_kelamin && (
									<p className="text-red-500 text-sm mt-1 flex items-start">
										<FiAlertCircle className="mr-1 mt-0.5 flex-shrink-0" />{" "}
										{errors.jenis_kelamin}
									</p>
								)}
							</div>
						</div>

						<div className="mt-8 flex justify-end">
							<motion.button
								type="submit"
								disabled={isSubmitting}
								className="btn-primary inline-flex items-center"
								whileTap={{ scale: 0.95 }}
							>
								{isSubmitting ? (
									<>
										<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
										Menyimpan...
									</>
								) : (
									<>
										Lanjutkan <FiArrowRight className="ml-2" />
									</>
								)}
							</motion.button>
						</div>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default UserIdentity;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dontol from "../assets/image/dontol.png";
// Impor ikon-ikon yang tersedia dari Feather Icons
import {
	FiArrowRight,
	FiShield,
	FiSettings,
	FiActivity,
	FiClock,
	FiUsers,
	FiBook,
	FiDollarSign,
	FiMonitor,
	FiInfo,
	FiHeart,
	FiAlertCircle, // Ganti FiBrain dengan FiAlertCircle
} from "react-icons/fi";

const Home = () => {
	// Definisi dampak untuk digunakan di bagian Grid
	const impactItems = [
		{
			title: "Waktu Terbuang",
			description:
				"Banyaknya waktu yang terbuang hanya karena bermain game tanpa batasan.",
			IconComponent: FiClock,
		},
		{
			title: "Gangguan Kesehatan",
			description:
				"Kesehatan mata terganggu akibat terlalu lama menatap layar.",
			IconComponent: FiMonitor,
		},
		{
			title: "Gangguan Psikologis",
			description:
				"Mudah emosional, sulit berkonsentrasi, dan sering mengantuk.",
			IconComponent: FiAlertCircle, // Menggunakan FiAlertCircle sebagai pengganti FiBrain
		},
		{
			title: "Pemborosan Biaya",
			description:
				"Pengeluaran berlebih untuk internet dan pembelian dalam game.",
			IconComponent: FiDollarSign,
		},
		{
			title: "Dampak Sosial",
			description:
				"Kesulitan berinteraksi sosial dan berkomunikasi di dunia nyata.",
			IconComponent: FiUsers,
		},
		{
			title: "Penurunan Akademik",
			description: "Menurunnya prestasi akademik dan minat belajar.",
			IconComponent: FiBook,
		},
	];

	// Animasi untuk komponen yang masuk
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
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

	return (
		<div className="page-container">
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="py-16 md:py-24"
			>
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
								Sistem Pakar <span className="text-primary">HEROin</span>
							</h1>
							<p className="text-lg text-gray-600 mb-8">
								Identifikasi dampak negatif kecanduan game online di kalangan
								mahasiswa dengan metode Backward Chaining dan Certainty Factor
							</p>
							<Link
								to="/identity"
								className="btn-primary inline-flex items-center"
							>
								Mulai Diagnosa <FiArrowRight className="ml-2" />
							</Link>
						</motion.div>

						<motion.div
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="hidden md:block"
						>
							<img
								src={dontol}
								alt="Gambar Dontol"
								className="w-full h-auto rounded-lg"
							/>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Penjelasan Tentang Sistem */}
			<motion.section
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="py-16 bg-white rounded-xl shadow-custom"
			>
				<div className="max-w-5xl mx-auto">
					<motion.div variants={itemVariants} className="text-center mb-12">
						<h2 className="text-3xl font-bold text-dark mb-4">
							Apa itu <span className="text-primary">HEROin</span>?
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							HEROin adalah sistem pakar yang membantu mengidentifikasi tingkat
							kecanduan game online pada mahasiswa menggunakan metode Backward
							Chaining dan Certainty Factor.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							variants={itemVariants}
							className="card transition-transform hover:scale-105"
						>
							<div className="p-3 w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
								<FiShield className="text-primary text-xl" />
							</div>
							<h3 className="text-xl font-semibold text-dark mb-2">
								Analisis Kecanduan
							</h3>
							<p className="text-gray-600">
								Menganalisis tingkat kecanduan game online berdasarkan
								gejala-gejala yang dialami pengguna dengan akurasi tinggi.
							</p>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="card transition-transform hover:scale-105"
						>
							<div className="p-3 w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
								<FiSettings className="text-primary text-xl" />
							</div>
							<h3 className="text-xl font-semibold text-dark mb-2">
								Metode Canggih
							</h3>
							<p className="text-gray-600">
								Menggunakan pendekatan Backward Chaining untuk inferensi dan
								Certainty Factor untuk mengukur tingkat kepastian diagnosis.
							</p>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="card transition-transform hover:scale-105"
						>
							<div className="p-3 w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
								<FiActivity className="text-primary text-xl" />
							</div>
							<h3 className="text-xl font-semibold text-dark mb-2">
								Solusi & Pencegahan
							</h3>
							<p className="text-gray-600">
								Memberikan solusi dan langkah pencegahan yang tepat berdasarkan
								tingkat kecanduan yang teridentifikasi.
							</p>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Bagaimana Cara Kerjanya */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.5 }}
				className="py-16"
			>
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-dark mb-4">
							Bagaimana Cara Kerjanya?
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							Proses identifikasi kecanduan game online menggunakan sistem
							HEROin sangat mudah dan cepat.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{[
							{
								step: 1,
								title: "Isi Identitas",
								description:
									"Masukkan data diri Anda sebagai langkah awal proses identifikasi.",
							},
							{
								step: 2,
								title: "Pilih Hipotesis",
								description: "Pilih tingkat kecanduan yang ingin Anda periksa.",
							},
							{
								step: 3,
								title: "Jawab Kuesioner",
								description:
									"Jawab pertanyaan dengan jujur sesuai dengan kondisi Anda.",
							},
							{
								step: 4,
								title: "Lihat Hasil",
								description:
									"Dapatkan hasil analisis dan rekomendasi penanganan.",
							},
						].map((item, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								className="card relative"
							>
								<div className="w-10 h-10 rounded-full gradient-bg text-white flex items-center justify-center font-bold mb-4">
									{item.step}
								</div>
								<h3 className="text-xl font-semibold text-dark mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600">{item.description}</p>

								{index < 3 && (
									<div className="hidden md:block absolute -right-10 top-1/2 transform -translate-y-1/2 z-10">
										<FiArrowRight className="text-primary text-2xl" />
									</div>
								)}
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							to="/identity"
							className="btn-primary inline-flex items-center"
						>
							Mulai Sekarang <FiArrowRight className="ml-2" />
						</Link>
					</div>
				</div>
			</motion.section>

			{/* Dampak Kecanduan Game */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="py-16 bg-white rounded-xl shadow-custom"
			>
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-dark mb-4">
							Dampak Kecanduan Game Online
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							Kecanduan game online dapat memberikan berbagai dampak negatif
							pada kehidupan mahasiswa.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{impactItems.map((item, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.03 }}
								className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
							>
								<div className="p-3 w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
									<item.IconComponent className="text-primary text-xl" />
								</div>
								<h3 className="text-lg font-semibold text-dark mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600">{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Call to Action */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="py-16"
			>
				<div className="max-w-5xl mx-auto">
					<div className="bg-primary rounded-xl p-8 md:p-12">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-white mb-4">
								Sudahkah Anda Kecanduan Game Online?
							</h2>
							<p className="text-lg text-white text-opacity-90 max-w-3xl mx-auto mb-8">
								Kenali tingkat kecanduan Anda dan dapatkan rekomendasi untuk
								mengatasinya sekarang.
							</p>
							<Link
								to="/identity"
								className="bg-white text-primary font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md inline-flex items-center"
							>
								Mulai Diagnosa <FiArrowRight className="ml-2" />
							</Link>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default Home;

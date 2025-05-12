import React from "react";
import { motion } from "framer-motion";
import { FiInfo, FiHeart, FiMail } from "react-icons/fi";

const Footer = () => {
	return (
		<footer className="bg-white shadow-inner pt-8 pb-6 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Logo dan Deskripsi */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col"
					>
						<div className="flex items-center mb-4">
							<span className="text-primary font-bold text-2xl">HERO</span>
							<span className="text-dark font-bold text-2xl">in</span>
						</div>
						<p className="text-gray-600 text-sm">
							Sistem pakar untuk identifikasi dampak negatif kecanduan game
							online di kalangan mahasiswa menggunakan metode backward chaining
							dan certainty factor.
						</p>
					</motion.div>

					{/* Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="flex flex-col"
					>
						<h3 className="text-dark font-semibold text-lg mb-4 flex items-center">
							<FiInfo className="mr-2" /> Informasi
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-primary transition-colors duration-300"
								>
									Tentang HEROin
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-primary transition-colors duration-300"
								>
									Cara Penggunaan
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-primary transition-colors duration-300"
								>
									Dampak Kecanduan Game
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-primary transition-colors duration-300"
								>
									Metode Penelitian
								</a>
							</li>
						</ul>
					</motion.div>

					{/* Kontak */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col"
					>
						<h3 className="text-dark font-semibold text-lg mb-4 flex items-center">
							<FiMail className="mr-2" /> Kontak Kami
						</h3>
						<p className="text-gray-600 mb-2">
							Jika Anda memiliki pertanyaan atau masukan, silakan hubungi kami:
						</p>
						<a
							href="mailto:info@heroin.app"
							className="text-primary hover:underline transition-colors duration-300"
						>
							info@heroin.app
						</a>
					</motion.div>
				</div>

				<div className="border-t border-gray-200 mt-8 pt-8">
					<div className="flex justify-center items-center">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="text-gray-500 text-sm flex items-center"
						>
							© {new Date().getFullYear()} HEROin. Dibuat dengan{" "}
							<FiHeart className="mx-1 text-primary" />
						</motion.p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

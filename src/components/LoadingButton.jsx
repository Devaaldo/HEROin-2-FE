import React from "react";
import { motion } from "framer-motion";

/**
 * Komponen tombol dengan indikator loading
 * @param {Object} props - Props komponen
 * @param {string} props.type - Tipe tombol (button, submit, reset)
 * @param {boolean} props.isLoading - Status loading
 * @param {string} props.className - Kelas tambahan
 * @param {Function} props.onClick - Fungsi klik
 * @param {React.ReactNode} props.children - Konten tombol
 * @param {React.ReactNode} props.icon - Ikon setelah teks (opsional)
 * @param {boolean} props.disabled - Status disabled
 * @param {string} props.loadingText - Teks saat loading (opsional)
 * @param {string} props.variant - Variasi tombol (primary, secondary, danger, success)
 */
const LoadingButton = ({
	type = "button",
	isLoading = false,
	className = "",
	onClick,
	children,
	icon,
	disabled = false,
	loadingText = "Loading...",
	variant = "primary",
}) => {
	// Menentukan kelas berdasarkan variant
	const getVariantClass = () => {
		switch (variant) {
			case "primary":
				return "bg-primary text-white hover:bg-opacity-90";
			case "secondary":
				return "bg-white text-primary border border-primary hover:bg-gray-50";
			case "danger":
				return "bg-red-600 text-white hover:bg-red-700";
			case "success":
				return "bg-green-600 text-white hover:bg-green-700";
			default:
				return "bg-primary text-white hover:bg-opacity-90";
		}
	};

	// Kelas dasar untuk semua tombol
	const baseClass =
		"font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center";

	// Kelas untuk status disabled
	const disabledClass = "opacity-60 cursor-not-allowed";

	return (
		<motion.button
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			whileTap={{ scale: isLoading || disabled ? 1 : 0.95 }}
			className={`${baseClass} ${getVariantClass()} ${
				isLoading || disabled ? disabledClass : ""
			} ${className}`}
		>
			{isLoading ? (
				<>
					<span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
					{loadingText}
				</>
			) : (
				<>
					{children}
					{icon && <span className="ml-2">{icon}</span>}
				</>
			)}
		</motion.button>
	);
};

export default LoadingButton;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const navLinks = [
		{ name: "Beranda", path: "/" },
		{ name: "Identitas", path: "/identity" },
		{ name: "Hipotesis", path: "/hypothesis" },
		{ name: "Kuesioner", path: "/questionnaire" },
		{ name: "Dashboard", path: "/dashboard" },
	];

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="flex-shrink-0"
						>
							<Link to="/">
								<div className="flex items-center">
									<span className="text-primary font-bold text-2xl">HERO</span>
									<span className="text-dark font-bold text-2xl">in</span>
								</div>
							</Link>
						</motion.div>

						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								{navLinks.map((link) => (
									<Link
										key={link.name}
										to={link.path}
										className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
											location.pathname === link.path
												? "text-primary font-semibold"
												: "text-gray-600 hover:text-primary"
										}`}
									>
										{link.name}
										{location.pathname === link.path && (
											<motion.div
												layoutId="underline"
												className="h-0.5 bg-primary mt-1"
												animate
											/>
										)}
									</Link>
								))}
							</div>
						</div>
					</div>

					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark focus:outline-none"
						>
							{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					className="md:hidden"
				>
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									location.pathname === link.path
										? "text-primary font-semibold"
										: "text-gray-600 hover:text-primary"
								}`}
								onClick={() => setIsOpen(false)}
							>
								{link.name}
							</Link>
						))}
					</div>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;

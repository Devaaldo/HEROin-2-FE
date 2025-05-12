import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import Pages
import Home from "./pages/Home";
import UserIdentity from "./pages/UserIdentity";
import Hypothesis from "./pages/Hypothesis";
import Questionnaire from "./pages/Questionnaire";
import Dashboard from "./pages/Dashboard";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Context
import { DiagnosisProvider } from "./contexts/DiagnosisContext";

export default function App() {
	return (
		<DiagnosisProvider>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Navbar />
					<main className="flex-grow">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/identity" element={<UserIdentity />} />
							<Route path="/hypothesis" element={<Hypothesis />} />
							<Route path="/questionnaire" element={<Questionnaire />} />
							<Route path="/dashboard" element={<Dashboard />} />
						</Routes>
					</main>
					<Footer />
				</div>
				<ToastContainer position="top-right" autoClose={3000} />
			</Router>
		</DiagnosisProvider>
	);
}

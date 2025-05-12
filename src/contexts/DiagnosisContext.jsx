import React, { createContext, useState, useContext } from "react";

const DiagnosisContext = createContext();

export const useDiagnosis = () => useContext(DiagnosisContext);

export const DiagnosisProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		nama_lengkap: "",
		usia: "",
		angkatan: "",
		program_studi: "",
		domisili: "",
		jenis_kelamin: "",
	});

	const [userId, setUserId] = useState(null);
	const [selectedHypothesis, setSelectedHypothesis] = useState(null);
	const [userAnswers, setUserAnswers] = useState([]);
	const [diagnosisResult, setDiagnosisResult] = useState(null);

	// Simpan data pengguna
	const saveUserData = (data) => {
		setUserData(data);
	};

	// Simpan ID pengguna setelah pendaftaran
	const saveUserId = (id) => {
		setUserId(id);
	};

	// Pilih hipotesis
	const selectHypothesis = (hypothesis) => {
		setSelectedHypothesis(hypothesis);
	};

	// Simpan jawaban pengguna
	const saveUserAnswers = (answers) => {
		setUserAnswers(answers);
	};

	// Simpan hasil diagnosis
	const saveDiagnosisResult = (result) => {
		setDiagnosisResult(result);
	};

	// Reset state (untuk memulai diagnosis baru)
	const resetState = () => {
		setUserData({
			nama_lengkap: "",
			usia: "",
			angkatan: "",
			program_studi: "",
			domisili: "",
			jenis_kelamin: "",
		});
		setUserId(null);
		setSelectedHypothesis(null);
		setUserAnswers([]);
		setDiagnosisResult(null);
	};

	const value = {
		userData,
		userId,
		selectedHypothesis,
		userAnswers,
		diagnosisResult,
		saveUserData,
		saveUserId,
		selectHypothesis,
		saveUserAnswers,
		saveDiagnosisResult,
		resetState,
	};

	return (
		<DiagnosisContext.Provider value={value}>
			{children}
		</DiagnosisContext.Provider>
	);
};

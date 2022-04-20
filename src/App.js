import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

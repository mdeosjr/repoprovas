import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import SignUp from './pages/SignUp';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/home' element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
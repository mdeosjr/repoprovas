import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import { Form, Input, Buttons } from '../../components/Form';
import StyledLink from '../../components/StyledLink';
import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

function Login() {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [input, setInput] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuth();
	let navigate = useNavigate();

	function login(e) {
		e.preventDefault();

		const promise = api.login({...userData})

		setInput(false);
		setDisabled(true);
		setLoading(true);

		promise.then((response) => loginSucess(response))
		promise.catch((error) => loginError(error))
	}

	function loginSucess(response) {
		localStorage.setItem('auth', JSON.stringify(response.data));
		setAuth(response.data)
		navigate('/home');
	}

	function loginError(error) {
		alert(error.response.data);
		setDisabled(false);
		setLoading(false);
		setInput(true);
  	}

	function handleInput(e) {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

	return (
		<Container>
			<Logo />
			<Form>
				<Title>Login</Title>
				<form onSubmit={login}>
					<Input
						active={input}
						type='email'
						placeholder='Email'
						name='email'
						onChange={handleInput}
						value={userData.email}
					/>
					<Input
						active={input}
						type='password'
						placeholder='Senha'
						name='password'
						onChange={handleInput}
						value={userData.password}
					/>
					<Buttons>
						<StyledLink to='/sign-up'>Não possuo cadastro</StyledLink>
						<LoadingButton
							type='submit'
							size='medium'
							variant='contained'
							disabled={disabled}
							loading={loading}
						>
							ENTRAR
						</LoadingButton>
					</Buttons>
				</form>
			</Form>
		</Container>
	);
}

export default Login;

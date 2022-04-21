import { useState } from 'react';
import Container from '../../components/Container';
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import { Form, Input, Buttons } from '../../components/Form';
import StyledLink from '../../components/StyledLink';
import Button from '@mui/material/Button';

function Login() {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [input, setInput] = useState(true);

	function handleInput(e) {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

	return (
		<Container>
			<Logo />
			<Form>
				<Title>Login</Title>
				<form>
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
				</form>
				<Buttons>
					<StyledLink to='/sign-up'>Não possuo cadastro</StyledLink>
					<Button variant='contained'>ENTRAR</Button>
				</Buttons>
			</Form>
		</Container>
	);
}

export default Login;

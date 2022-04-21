import { useState } from 'react';
import Container from '../../components/Container';
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import { Form, Input, Buttons } from '../../components/Form';
import StyledLink from '../../components/StyledLink';
import Button from '@mui/material/Button';

function SignUp() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
	});
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [input, setInput] = useState(true);

    function handleInput(e) {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

    function register(e) {
        e.preventDefault();

        if (passwordConfirm !== userData.password) {
            alert('Senhas não conferem!');
            return;
        }

        setInput(false);
	}

	return (
		<Container>
			<Logo />
			<Form>
				<Title>Cadastro</Title>
				<form onSubmit={register}>
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
					<Input
						active={input}
						type='password'
						placeholder='Confirme sua senha'
						name='passwordConfirm'
						onChange={(e) => setPasswordConfirm(e.target.value)}
						value={passwordConfirm}
					/>
				</form>
				<Buttons>
					<StyledLink to='/'>Já possuo cadastro</StyledLink>
					<Button variant='contained'>CADASTRAR</Button>
				</Buttons>
			</Form>
		</Container>
	);
}

export default SignUp;

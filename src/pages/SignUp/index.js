import { useState } from 'react';
import FrontPageContainer from '../../components/FrontPageContainer';
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import { Form, Input, Buttons } from '../../components/Form';
import StyledLink from '../../components/StyledLink';
import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
	});
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [input, setInput] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	let navigate =  useNavigate();

    function handleInput(e) {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

	function registerError(error) {
		alert(error.response.data);
		setInput(true);
		setDisabled(false);
		setLoading(false)
	}

    function register(e) {
        e.preventDefault();

        if (passwordConfirm !== userData.password) {
            alert('Senhas não conferem!');
            return;
        }
		
		const promise = api.createUser({...userData});

		setInput(false);
		setDisabled(true);
		setLoading(true);

		promise.then(() => navigate("/"))
		promise.catch(error => registerError(error));
	}

	return (
		<FrontPageContainer>
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
					<Buttons>
						<StyledLink to='/'>Já possuo cadastro</StyledLink>
						<LoadingButton
							type='submit'
							variant='contained'
							disabled={disabled}
							loading={loading}
						>
							CADASTRAR
						</LoadingButton>
					</Buttons>
				</form>
			</Form>
		</FrontPageContainer>
	);
}

export default SignUp;

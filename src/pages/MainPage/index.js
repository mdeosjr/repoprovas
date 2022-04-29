import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageContainer from '../../components/MainPageContainer';
import ButtonGroup from '../../components/ButtonGroup';
import Header from '../../components/Header';
import TermsContent from '../../components/TermsContent';
import TeachersContent from '../../components/TeachersContent';
import AddTest from '../../components/AddTest';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

function MainPage() {
	const [value, setValue] = useState('disciplinas');
	let navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		api.validateToken(auth).then((response) => {
			console.log(response.data)
		}).catch(err => {
			alert("You must be logged to acess the page!");
			navigate('/');
		})
	}, [auth]);

	return (
		<>
			<Header mainPage={true} label={value}/>
			<MainPageContainer>
				<ButtonGroup value={value} setValue={setValue} />
				{value === 'disciplinas' && <TermsContent />}
				{value === 'instrutores' && <TeachersContent />}
				{value === 'adicionar' && <AddTest setValue={setValue} />}
			</MainPageContainer>
		</>
	);
}

export default MainPage;

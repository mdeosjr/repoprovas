import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageContainer from '../../components/MainPageContainer';
import ButtonGroup from '../../components/ButtonGroup';
import Header from '../../components/Header';
import TermsContent from '../../components/TermsContent/TermsContent';
import TeachersContent from '../../components/TeachersContent/TeachersContent';
import AddTest from '../../components/AddTest';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

function MainPage() {
	const [termsContent, setTermsContent] = useState([]);
	const [teachersContent, setTeachersContent] = useState([]);
	const [discipline, setDiscipline] = useState([]);
	const [search, setSearch] = useState('');
	const [value, setValue] = useState('disciplinas');
	let navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		api.validateToken(auth)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				alert('You must be logged to acess the page!');
				navigate('/');
			});
	}, [auth, navigate]);

	return (
		<>
			<Header
				mainPage={true}
				label={value}
				terms={termsContent}
				teachers={teachersContent}
				setSearch={setSearch}
				setDiscipline={setDiscipline}
			/>
			<MainPageContainer>
				<ButtonGroup value={value} setValue={setValue} setSearch={setSearch}/>
				{value === 'disciplinas' && (
					<TermsContent
						setTermsContent={setTermsContent}
						termsContent={termsContent}
						search={search}
						discipline={discipline}
					/>
				)}
				{value === 'instrutores' && (
					<TeachersContent
						setTeachersContent={setTeachersContent}
						teachersContent={teachersContent}
						search={search}
					/>
				)}
				{value === 'adicionar' && <AddTest setValue={setValue} />}
			</MainPageContainer>
		</>
	);
}

export default MainPage;

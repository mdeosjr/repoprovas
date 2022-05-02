import { useState, useEffect } from 'react';
import {
	TextField,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

function AddTest({setValue}) {
	const { auth } = useAuth();
	const [data, setData] = useState({
		name: '',
		pdfUrl: '',
		category: '',
		discipline: '',
		teacher: '',
	});
	const [teachers, setTeachers] = useState([]);
	const [categories, setCategories] = useState([]);
	const [disciplines, setDisciplines] = useState([]);
	const [filteredTeachers, setFilteredTeachers] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, [auth]);

	function fetchData() {
		const teachersContent = api.getTeachersContent(auth);
		teachersContent.then((response) => {
			setTeachers(response.data);
		});

		const disciplinesContent = api.getDisciplinesList(auth);
		disciplinesContent.then((response) => {
			setDisciplines(response.data);
		});

		const categoriesList = api.getCategoriesList(auth);
		categoriesList.then((response) => {
			setCategories(response.data);
		});
	}

	const filterTeachers = (disciplineName) => {
		setFilteredTeachers(
			teachers.filter((t) => t.disciplines.includes(disciplineName))
		);
	};

	function handleInput(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	function filterAndHandle(e) {
		filterTeachers(e.target.value);
		handleInput(e);
	}

	function sendData(e) {
		e.preventDefault();

		const promise = api.sendData(auth, { ...data });

		setDisabled(true);
		setLoading(true);

		promise.then((response) => {
			setDisabled(false);
			setLoading(false);
            setValue("disciplinas")
		});
		promise.catch((err) => console.log(err));
	}

	return (
		<Form onSubmit={sendData}>
			<TextField
				required
                name="name"
				value={data.name}
				onChange={handleInput}
				label='Titulo da prova'
			/>
			<TextField
				required
                name="pdfUrl"
				value={data.pdfUrl}
				onChange={handleInput}
				label='PDF da prova'
			/>
			<FormControl>
				<InputLabel id='label'>Categoria</InputLabel>
				<Select
					required
					value={data.category}
					onChange={handleInput}
					labelId='label'
					label='Categoria'
					name='category'
				>
					{categories.map((category) => (
						<MenuItem
							key={category.id}
							value={category.name}
							name='category'
						>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='label'>Disciplina</InputLabel>
				<Select
					required
					value={data.discipline}
					onChange={(e) => {
						filterAndHandle(e);
					}}
					labelId='label'
					label='Disciplina'
					name='discipline'
				>
					{disciplines.map((discipline) => (
						<MenuItem
							key={discipline.id}
							value={discipline.name}
							name='discipline'
						>
							{discipline.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id='label'>Pessoa Instrutora</InputLabel>
				<Select
					required
					value={data.teacher}
					onChange={handleInput}
					labelId='label'
					label='Pessoa Instrutora'
					disabled={data.discipline === ''}
					name='teacher'
				>
					{filteredTeachers.map((teacher) => (
						<MenuItem
							key={teacher.id}
							value={teacher.instructorName}
							name='teacher'
						>
							{teacher.instructorName}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<LoadingButton
				type='submit'
				variant='contained'
				size='large'
				disabled={disabled}
				loading={loading}
			>
				ENVIAR
			</LoadingButton>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 34px;
`;

export default AddTest;

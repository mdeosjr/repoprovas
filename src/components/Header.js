import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
	TextField,
	Menu,
	MenuItem,
	Typography,
	Autocomplete,
} from '@mui/material';
import api from '../services/api';

function Header({
	mainPage,
	label,
	terms,
	teachers,
	setSearch,
	setDiscipline,
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const { auth, setAuth } = useAuth();
	let navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		api.validateToken(auth);
		localStorage.removeItem('auth');
		setAuth(null);
		navigate('/');
	};

	function searchOptions() {
		if (label === 'disciplinas') {
			const disciplines = [];

			terms.map((term) =>
				term.disciplines.map((d) => disciplines.push(d.name))
			);

			return disciplines;
		}

		return teachers.map((teacher) => teacher.instructorName);
	}

	function searchedDiscipline(name) {
		const promise = api.getDisciplinesContent(auth, name);
		promise.then((response) => setDiscipline(response.data));
		setSearch(name);
	}

	return (
		<Container>
			<LogoContainer>
				<Logo mainPage={mainPage} />
				<LogoutRoundedIcon
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					sx={{ fontSize: 40 }}
					onClick={handleClick}
					cursor='pointer'
				/>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={logout}>Logout</MenuItem>
				</Menu>
			</LogoContainer>
			{label === 'adicionar' ? (
				<Typography
					sx={{
						alignSelf: 'center',
						fontSize: 22,
						fontFamily: 'Poppins',
						fontWeight: '500',
						letterSpacing: 0.15,
						color: 'rgba(0, 0, 0, 0.8)',
					}}
				>
					Adicione uma prova
				</Typography>
			) : (
				<Autocomplete
					sx={{ width: 700, alignSelf: 'center' }}
					freeSolo
					options={searchOptions()}
					onInputChange={(e, value) => {
						setSearch(value);
						searchedDiscipline(value);
					}}
					renderInput={(params) => (
						<TextField {...params} label={`Procure por ${label}`} />
					)}
				/>
			)}
		</Container>
	);
}

const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	height: 250px;
	width: 100%;
	padding: 55px 55px 25px;

	border-bottom: 1px solid #c4c4c4;

	.MuiTextField-root {
		align-self: center;
	}
`;

export default Header;

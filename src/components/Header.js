import { useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header({mainPage}) {
    const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</LogoContainer>
				<TextField
					sx={{ width: 464, height: 56 }}
					label='Pesquise por disciplina'
				/>
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

    border-bottom: 1px solid #C4C4C4;

    .MuiTextField-root {
        align-self: center;
    }
`;

export default Header;
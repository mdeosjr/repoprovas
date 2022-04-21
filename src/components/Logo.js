import logo from '../assets/images/logo.svg';
import styled from 'styled-components';

function Logo() {
    return <Image src={logo} alt="logo"/>
}

const Image = styled.img`
	width: 292px;
	height: 64px;

	margin-top: 55px;
`;

export default Logo;
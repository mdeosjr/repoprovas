import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
	all: unset;
	font: normal 500 12px/24px 'Poppins';
	letter-spacing: 0.15px;
	cursor: pointer;
	color: rgba(70, 115, 202, 0.8);
	text-decoration-line: underline;
`;

export default StyledLink;
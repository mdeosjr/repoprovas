import styled from 'styled-components';

const Form = styled.div`
	height: 100vh;
	
    margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 34px;

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
`;

const Input = styled.input`
	all: unset;

	box-sizing: border-box;
	width: 464px;
	height: 56px;
	padding: 0 16px;

	display: flex;
	flex-direction: row;

	background: ${(props) => (props.active ? '#FFFFFF' : '#F2F2F2')};
	border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;

	font: normal 20px 'Poppins';
	color: ${(props) => (props.active ? '#000000' : '#AFAFAF')};
	${(props) => !props.active && 'pointer-events: none;'}
	&::placeholder {
		font: normal 500 16px/24px 'Poppins';
		letter-spacing: 0.15px;

		color: rgba(0, 0, 0, 0.6);
	}
`;

const Buttons = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export { Form, Input, Buttons };
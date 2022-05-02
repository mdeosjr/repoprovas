import { ToggleButtonGroup, ToggleButton } from '@mui/material';

function ButtonGroup({ value, setValue, setSearch }) {
	const handleValue = (event, newValue) => {
		if (newValue !== null) {
			setValue(newValue);
		}
	};

	return (
		<ToggleButtonGroup
			sx={{
				marginTop: 4,
				marginBottom: 4,
				border: '1px solid rgba(25, 118, 210, 0.5)',
			}}
			color='primary'
			fullWidth
			value={value}
			exclusive
			onChange={handleValue}
		>
			<ToggleButton value='disciplinas' onClick={() => setSearch('')}>
				DISCIPLINAS
			</ToggleButton>
			<ToggleButton value='instrutores' onClick={() => setSearch('')}>
				PESSOAS INSTRUTORAS
			</ToggleButton>
			<ToggleButton value='adicionar'>
				ADICIONAR
			</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default ButtonGroup;

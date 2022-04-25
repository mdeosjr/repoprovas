import { ToggleButtonGroup, ToggleButton } from '@mui/material';

function ButtonGroup({value, setValue}) {
    const handleValue = (event, newValue) => {
        if (newValue !== null) {
            setValue(newValue);
        }
    };

    return (
			<ToggleButtonGroup
				sx={{ marginTop: 4, marginBottom: 4, border: '1px solid rgba(25, 118, 210, 0.5)' }}
				color='primary'
				fullWidth
				value={value}
				exclusive
				onChange={handleValue}
			>
				<ToggleButton value='disciplinas'>DISCIPLINAS</ToggleButton>
				<ToggleButton value='instrutores'>PESSOAS INSTRUTORAS</ToggleButton>
				<ToggleButton value='adicionar' disabled>
					ADICIONAR
				</ToggleButton>
			</ToggleButtonGroup>
		);
}

export default ButtonGroup;
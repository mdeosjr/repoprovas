import { Link } from '@mui/material';

function LinkComponent({ tests }) {
	return tests.map((test) => (
		<Link
			sx={{
				fontSize: 14,
				fontFamily: 'Poppins',
				color: '#808080',
				cursor: 'pointer',
			}}
			key={test.name}
			href={test.pdfUrl}
			underline='hover'
			target='_blank'
			rel='noopener'
		>
			{test.name} - ({test.teachersDisciplines.disciplines.name})
			<br />
		</Link>
	));
}

export default LinkComponent;

import { Link, Box, Typography } from '@mui/material';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

function LinkComponent({ tests, setAttHook }) {
	const { auth } = useAuth();
	
	function updateTestViews(id) {
		api.updateTestViews(auth, id).then((res) => {
			setAttHook(true)
			setAttHook(false)
		}).catch((err) => {
			console.error(err)
		})
	}

	return tests.map((test) => (
		<Box
			key={test.id}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
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
				onClick={() => updateTestViews(test.id)}
			>
				{test.name} - ({test.teachersDisciplines.disciplines.name})
				<br />
			</Link>
			<Typography
				sx={{
					fontSize: 14,
					fontFamily: 'Poppins',
					color: '#808080',
				}}
			>
				{test.viewsCount} views
			</Typography>
		</Box>
	));
}

export default LinkComponent;

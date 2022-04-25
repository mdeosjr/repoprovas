import { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

function TeachersContent() {
	const [content, setContent] = useState([]);
	const { auth } = useAuth();

	useEffect(() => {
		const promise = api.getTeachersContent(auth);
		promise.then((response) => {
			setContent(response.data);
		});
	}, [auth]);

	return (
		<>
			{content.map((content) => (
				<Accordion key={content.id}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						{content.instructorName}
					</AccordionSummary>
					{content.categories.map(
						(category) =>
							category.tests.length !== 0 && (
								<AccordionDetails sx={{ px: 4 }} key={category.id}>
									{category.name}
									<br />
									{category.tests.map((test) => (
										<Typography
											sx={{
												fontSize: 14,
												fontFamily: 'Poppins',
												color: '#808080',
											}}
											key={category.id}
										>
											{test.name} - (
											{test.teachersDisciplines.disciplines.name})
										</Typography>
									))}
								</AccordionDetails>
							)
					)}
				</Accordion>
			))}
		</>
	);
}

export default TeachersContent;

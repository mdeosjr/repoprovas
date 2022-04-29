import { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Link,
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
	console.log(content);

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
											{test.name} - (
											{test.teachersDisciplines.disciplines.name})
											<br/>
										</Link>
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

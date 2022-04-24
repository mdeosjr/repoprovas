import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
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
					{content.categories.map((category) => (
						<AccordionDetails key={category.id}>
							{category.name}
							<br />
							{category.tests.map((test) => (
								<p key={category.id}>
									{test.name} - 
									({test.teachersDisciplines.disciplines.name})
								</p>
							))}
						</AccordionDetails>
					))}
				</Accordion>
			))}
		</>
	);
}

export default TeachersContent;

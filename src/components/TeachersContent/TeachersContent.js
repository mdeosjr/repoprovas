import { useEffect } from 'react';
import { Accordion, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import AccordionDetailsComponent from '../TeachersContent/AccordionDetailsComponent';

function TeachersContent({ teachersContent, setTeachersContent, search }) {
	const { auth } = useAuth();

	useEffect(() => {
		const promise = api.getTeachersContent(auth);
		promise.then((response) => {
			setTeachersContent(response.data);
		});
	}, [auth, setTeachersContent]);

	return (
		<>
			{search !== ''
				? teachersContent
						.filter((teacher) => teacher.instructorName === search)
						.map((content) => (
							<Accordion key={content.id}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									{content.instructorName}
								</AccordionSummary>
								<AccordionDetailsComponent
									categoriesInfo={content.categories}
								/>
							</Accordion>
						))
				: teachersContent.map((content) => (
						<Accordion key={content.id}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								{content.instructorName}
							</AccordionSummary>
							<AccordionDetailsComponent
								categoriesInfo={content.categories}
							/>
						</Accordion>
				  ))}
		</>
	);
}

export default TeachersContent;

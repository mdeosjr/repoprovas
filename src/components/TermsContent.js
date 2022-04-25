import { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

function TermsContent() {
	const [content, setContent] = useState([]);
	const { auth } = useAuth();

	useEffect(() => {
		const promise = api.getTermsContent(auth);
		promise.then((response) => {
			setContent(response.data);
		});
	}, [auth]);
	console.log(content);

	return (
		<>
			{content.map((term) => (
				<Accordion key={term.id}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						{term.termName}º Período
					</AccordionSummary>
					<AccordionDetails>
						{term.termTests.map((test) => (
							<Accordion key={term.id}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									{test.disciplineName}
								</AccordionSummary>
								{test.testsCategory.map(
									(category) =>
										category.tests.length !== 0 && (
											<AccordionDetails
												key={category.name}
												sx={{ px: 4 }}
											>
												{category.name}
												<br />
												{category.tests.map((t) => (
													<Link
														sx={{
															fontSize: 14,
															fontFamily: 'Poppins',
															color: '#808080',
															cursor: 'pointer',
														}}
														key={category.id}
														href={t.pdfUrl}
														underline='hover'
														target='_blank'
														rel='noopener'
													>
														{t.name} - (
														{t.teachersDisciplines.teachers.name})
														<br />
													</Link>
												))}
											</AccordionDetails>
										)
								)}
							</Accordion>
						))}
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
}

export default TermsContent;

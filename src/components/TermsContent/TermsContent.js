import { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Link,
	Typography,
	Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

function TermsContent({ setTermsContent, termsContent, search, discipline }) {
	const [disciplinesContent, setDisciplinesContent] = useState([]);
	const [expanded, setExpanded] = useState(false);
	const [attHook, setAttHook] = useState(false);
	const { auth } = useAuth();

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	useEffect(() => {
		const promise = api.getTermsContent(auth);
		promise.then((response) => {
			setTermsContent(response.data);
		});
	}, [auth, setTermsContent, attHook]);

	function fetchDisciplinesContent(id) {
		const promise = api.getDisciplinesContentById(auth, id);

		promise.then((response) => {
			setDisciplinesContent(response.data);
		});
	}

	function updateTestViews(id) {
		api.updateTestViews(auth, id)
			.then((res) => {
				setAttHook(true);
				setAttHook(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<>
			{search === '' ? (
				termsContent.map((term) => (
					<Accordion key={term.id}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							{term.number}º Período
						</AccordionSummary>
						<AccordionDetails>
							{term.disciplines.map((discipline) => (
								<Accordion
									key={discipline.id}
									onClick={() =>
										fetchDisciplinesContent(discipline.id)
									}
									expanded={expanded === discipline.id}
									onChange={handleChange(discipline.id)}
								>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										{discipline.name}
									</AccordionSummary>
									{disciplinesContent.map(
										(category) =>
											category.tests.length !== 0 && (
												<AccordionDetails
													key={category.name}
													sx={{ px: 4 }}
												>
													{category.name}
													<br />
													{category.tests.map((t) => (
														<Box
															key={t.id}
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
																key={t.id}
																href={t.pdfUrl}
																underline='hover'
																target='_blank'
																rel='noopener'
																onClick={() =>
																	updateTestViews(t.id)
																}
															>
																{t.name} - (
																{
																	t.teachersDisciplines
																		.teachers.name
																}
																)
																<br />
															</Link>
															<Typography
																sx={{
																	fontSize: 14,
																	fontFamily: 'Poppins',
																	color: '#808080',
																}}
															>
																{t.viewsCount} views
															</Typography>
														</Box>
													))}
												</AccordionDetails>
											)
									)}
								</Accordion>
							))}
						</AccordionDetails>
					</Accordion>
				))
			) : (
				<Accordion onClick={() => fetchDisciplinesContent(discipline.id)}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						{discipline.name}
					</AccordionSummary>
					{disciplinesContent.map(
						(category) =>
							category.tests.length !== 0 && (
								<AccordionDetails key={category.name} sx={{ px: 4 }}>
									{category.name}
									<br />
									{category.tests.map((t) => (
										<Box
											key={t.id}
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
												key={t.id}
												href={t.pdfUrl}
												underline='hover'
												target='_blank'
												rel='noopener'
												onClick={() => updateTestViews(t.id)}
											>
												{t.name} - (
												{t.teachersDisciplines.teachers.name})
												<br />
											</Link>
											<Typography
												sx={{
													fontSize: 14,
													fontFamily: 'Poppins',
													color: '#808080',
												}}
											>
												{t.viewsCount} views
											</Typography>
										</Box>
									))}
								</AccordionDetails>
							)
					)}
				</Accordion>
			)}
		</>
	);
}

export default TermsContent;

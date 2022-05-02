import { AccordionDetails } from '@mui/material';
import LinkComponent from '../TeachersContent/LinkComponent';

function AccordionDetailsComponent({ categoriesInfo }) {
	return categoriesInfo.map(
		(category) =>
			category.tests.length !== 0 && (
				<AccordionDetails sx={{ px: 4 }} key={category.id}>
					{category.name}
					<br />
					<LinkComponent tests={category.tests}/>
				</AccordionDetails>
			)
	);
}

export default AccordionDetailsComponent;
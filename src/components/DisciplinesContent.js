import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DisciplinesContent() {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                1
            </AccordionSummary>
            <AccordionDetails>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        1.1
                    </AccordionSummary>
                    <AccordionDetails>ipsum</AccordionDetails>
                </Accordion>
            </AccordionDetails>
        </Accordion>
	);
}

export default DisciplinesContent;
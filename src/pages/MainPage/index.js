import { useState } from 'react';
import MainPageContainer from "../../components/MainPageContainer";
import ButtonGroup from "../../components/ButtonGroup";
import Header from "../../components/Header";
import TermsContent from "../../components/TermsContent";
import TeachersContent from "../../components/TeachersContent";

function MainPage() {
    const [value, setValue] = useState('disciplinas');

    return (
			<>
				<Header mainPage={true} />
				<MainPageContainer>
					<ButtonGroup value={value} setValue={setValue} />
					{value === 'disciplinas' && <TermsContent />}
					{value === 'instrutores' && <TeachersContent />}
				</MainPageContainer>
			</>
		);
}

export default MainPage;    
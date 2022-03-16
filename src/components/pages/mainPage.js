import {useState} from 'react';
import ErrorBoundary from "../errorBoundary/errorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import SearchForm from "../searchForm/SearchForm";

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null)
	const onCharSelected = id => setSelectedChar(id)

	return (
		<>
			<ErrorBoundary>
				<RandomChar/>
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected}/>
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>
					<ErrorBoundary>
						<SearchForm/>
					</ErrorBoundary>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision"/>
		</>
	);
};

export default MainPage;
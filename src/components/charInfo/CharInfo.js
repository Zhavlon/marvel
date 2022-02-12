import {useState, useEffect} from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

const CharInfo = ({charId}) => {
	const [char, setChar] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		updateChar()
	}, [])

	useEffect(() => {
		updateChar()
	}, [charId])

	const marvelService = new MarvelService()

	const onCharLoading = () => setLoading(true)

	const onCharLoaded = (char) => {
		setChar(char)
		setLoading(false)
	}

	const onError = () => setError(true)

	const updateChar = () => {
		if (!charId) {
			return
		}

		onCharLoading()
		marvelService.getCharacter(charId)
			.then(onCharLoaded)
			.catch(onError)
	}

	const skeleton = char || loading || error ? null : <Skeleton/>
	const errorMessage = error ? <ErrorMessage/> : null
	const loader = loading ? <Loader/> : null
	const content = !(loading || error) && char ? <View char={char}/> : null

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{loader}
			{content}
		</div>
	)
}

const View = ({char: {name, thumbnail, homepage, description, wiki, comics}}) => {

	const objectFit = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={{objectFit}}/>
				<div>
					<div className="char__info-name">thor</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "There's no comics there"}
				{
					comics.map(({name}, i) => {
						if (i > 9) return;
						return (
							<li
								key={i}
								className="char__comics-item">
								{name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export default CharInfo;
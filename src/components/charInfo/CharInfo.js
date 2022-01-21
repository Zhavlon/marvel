import {Component} from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService()

	onCharLoading = () => {
		this.setState({loading: true})
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false
		})
	}

	onError = () => {
		this.setState({error: true})
	}

	updateChar = () => {
		if (!this.props.charId) {
			return
		}

		this.onCharLoading()
		this.marvelService.getCharacter(this.props.charId)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateChar()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar()
		}
	}

	render() {
		const {char, loading, error} = this.state

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
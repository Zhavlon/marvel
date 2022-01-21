import {Component} from "react";

import MarvelService from "../../services/MarvelService";
import Loader from "../loader/loader";
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss';

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.marvelService.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	onCharListLoaded = (charList) => {
		this.setState({
			charList,
			loading: false
		})
	}

	renderItems = (arr) => {
		const items = arr.map(({thumbnail, name, id}) => {

			const objectFit = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'

			return (
				<li
					onClick={() => this.props.onCharSelected(id)}
					key={id}
					className="char__item char__item_selected">
					<img src={thumbnail} style={{objectFit}} alt="abyss"/>
					<div className="char__name">{name}</div>
				</li>
			)
		})

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	render() {
		const {charList, loading, error} = this.state

		const items = this.renderItems(charList)

		const loader = loading ? <Loader/> : null
		const errorMessage = error ? <ErrorMessage/> : null
		const content = !(loading || error) ? items : null

		return (
			<div className="char__list">
				{errorMessage}
				{loader}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;
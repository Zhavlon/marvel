import {Component} from "react";
import PropTypes from 'prop-types'

import MarvelService from "../../services/MarvelService";
import Loader from "../loader/loader";
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss';

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newCharListLoading: false,
		offset: 250,
		charEnded: false
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.onRequest()
		window.addEventListener('scroll', this.scrollItemsLoad)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollItemsLoad)
	}

	scrollItemsLoad = () => {
		const page = document.documentElement
		const {offset} = this.state

		if (page.clientHeight + page.scrollTop >= page.scrollHeight) {
			this.onRequest(offset)
		}
	}

	onRequest = (offset) => {
		this.newCharListLoading()
		this.marvelService.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}

		this.setState(({charList, offset}) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newCharListLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}

	newCharListLoading = () => {
		this.setState({
			newCharListLoading: true
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
		const {charList, loading, error, newCharListLoading, offset, charEnded} = this.state

		const items = this.renderItems(charList)

		const loader = loading ? <Loader/> : null
		const errorMessage = error ? <ErrorMessage/> : null
		const content = !(loading || error) ? items : null

		return (
			<div className="char__list">
				{errorMessage}
				{loader}
				{content}
				<button
					style={{display: charEnded ? 'none' : 'block'}}
					onClick={() => this.onRequest(offset)}
					disabled={newCharListLoading}
					className="button button__main button__long"
				>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func
}

export default CharList;
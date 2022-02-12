import {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'

import MarvelService from "../../services/MarvelService";
import Loader from "../loader/loader";
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss';

const CharList = ({onCharSelected}) => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newCharListLoading, setNewCharListLoading] = useState(false);
	const [offset, setOffset] = useState(250);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService()
	console.log(offset)

	useEffect(() => {
		onRequest()
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', scrollItemsLoad)
		return () => {
			window.removeEventListener('scroll', scrollItemsLoad)
		}
	})

	const scrollItemsLoad = () => {
		const page = document.documentElement

		if (page.clientHeight + page.scrollTop >= page.scrollHeight) {
			onRequest(offset)
		}
	}

	let renderCount = useRef(1)

	useEffect(() => {
		renderCount.current += 1
		console.log(renderCount.current)
	})

	const onRequest = (offset) => {
		setNewCharListLoading(true)
		marvelService.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError)
	}

	const onError = () => {
		setLoading(false)
		setError(true)
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList(charList => ([...charList, ...newCharList]))
		setLoading(false)
		setNewCharListLoading(false)
		setOffset(offset => offset + 9)
		setCharEnded(ended)
	}

	const itemRefs = useRef([])

	const refFocus = (i) => {
		itemRefs.current.forEach(item => {
			item.classList.remove('char__item_selected')
		})

		itemRefs.current[i].classList.add('char__item_selected')
		itemRefs.current[i].focus()
	}

	const renderItems = (arr) => {
		const items = arr.map(({thumbnail, name, id}, i) => {

			const objectFit = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'

			return (
				<li
					tabIndex={0}
					onClick={() => {
						onCharSelected(id)
						refFocus(i)
					}}
					ref={el => itemRefs.current[i] = el}
					key={id}
					className="char__item">
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

	const items = renderItems(charList)

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
				onClick={() => onRequest(offset)}
				disabled={newCharListLoading}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func
}

export default CharList;
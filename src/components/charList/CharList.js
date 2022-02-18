import {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'

import useMarvelService from "../../services/MarvelService";
import Loader from "../loader/loader";
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss';

const CharList = ({onCharSelected}) => {
	const [charList, setCharList] = useState([]);
	const [newCharListLoading, setNewCharListLoading] = useState(false);
	const [offset, setOffset] = useState(250);
	const [charEnded, setCharEnded] = useState(false);

	const {loading, error, getAllCharacters} = useMarvelService()

	useEffect(() => {
		onRequest(offset, true)
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

	const onRequest = (offset, initial) => {
		initial ? setNewCharListLoading(false) : setNewCharListLoading(true)
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList(charList => ([...charList, ...newCharList]))
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
					onKeyPress={e => {
						if (e.key === 'Enter') {
							onCharSelected(id)
							refFocus(i)
						}
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

	const loader = loading && !newCharListLoading ? <Loader/> : null
	const errorMessage = error ? <ErrorMessage/> : null

	return (
		<div className="char__list">
			{errorMessage}
			{loader}
			{items}
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
import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Loader from "../loader/loader";

import './singleComic.scss';

const SingleComicPage = () => {
	const {comicId} = useParams()
	const [comic, setComic] = useState(null)
	const {loading, error, clearError, getComic} = useMarvelService()

	useEffect(() => {
		updateChar()
	}, [comicId])

	const onComicLoaded = (comic) => {
		setComic(comic)
		console.log(comic)
	}

	const updateChar = () => {
		clearError()
		getComic(comicId)
			.then(onComicLoaded)
	}

	const errorMessage = error ? <ErrorMessage/> : null
	const loader = loading ? <Loader/> : null
	const content = (!loading && !error && comic) ? <View comic={comic}/> : null

	return (
		<>
			{errorMessage}
			{loader}
			{content}
		</>
	)
}


const View = ({comic: {title, description, thumbnail, pageCount, language, price}}) => {


	return (
		<div className="single-comic">
			<img src={thumbnail} alt="x-men" className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">{language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;
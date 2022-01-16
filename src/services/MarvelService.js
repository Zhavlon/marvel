class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=fb532fff92184ba4eac9f9a871e66ed5'

	getResource = async (url) => {
		const res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}


	getAllCharacters = () => {
		return this.getResource(`${this._apiBase}characters?limit=9&offset=600&${this._apiKey}`)
	}

	getCharacter = () => {
		return this.getResource(`${this._apiBase}characters/1011413?${this._apiKey}`)
	}
}

export default MarvelService
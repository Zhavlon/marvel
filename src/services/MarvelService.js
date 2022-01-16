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


	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=250&${this._apiKey}`)
		return res.data.results.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
		return this._transformCharacter(res.data.results[0])
	}

	_transformCharacter = (res) => {
		return {
			name: res.name,
			description: res.description,
			thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
			homepage: res.urls[0].url,
			wiki: res.urls[1].url
		}
	}
}

export default MarvelService
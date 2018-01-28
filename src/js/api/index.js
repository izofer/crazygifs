import config from './config.js';

const apiKey = config.apiKey;

const URL    = `http://api.giphy.com/v1/gifs/search?q=:search:&api_key=${apiKey}&limit=:limit:`;

const crazyGifs = function getGifs(search,limit)
{
	const urls = URL.replace(':search:',search);
	const url  = urls.replace(':limit:',limit);

	return fetch(url)
			.then(res  => res.json())
			.then(json => json.data)
			.catch(error => console.error(error))
}

export default crazyGifs;
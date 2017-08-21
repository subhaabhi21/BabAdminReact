var api = {
	authenticate(url,fetch_type){		
    return fetch(url,{method: fetch_type}).then((response) => response.json())
	}
}

module.exports = api;
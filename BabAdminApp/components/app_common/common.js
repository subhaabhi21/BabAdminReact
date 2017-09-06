var Api= {
	domain : "",
	header_token : "",
	isLoading : true,

	setDomain(domain){
		this.domain = domain;
	},

	getDomain(){
		return this.domain;
	},

	setHeaderToken(token){
		this.header_token = token;
	},

	getHeaderToken(){
		return this.header_token;
	},

	queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
	},

	call_api(action,params,fetch_type){

		var url = this.domain + "/api/v1/" + action;
		var params = {"headers[_token]" : this.getHeaderToken()}
		if(params) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(params);
    }

		console.log("URL: ",url);
		this.isLoading = true
			return  fetch(url,{method: fetch_type}).then((response) => {
				this.isLoading = false
				return response.json()
			})
		},
	}

module.exports = Api;

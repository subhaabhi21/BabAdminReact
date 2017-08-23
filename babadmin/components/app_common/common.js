var api= {
	domain : "",
	header_token : "",

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

	call_api(action,params,fetch_type){

		var header = encodeURI("headers[_token]=" + this.getHeaderToken())
		var url = this.domain  + action + "?" + header + "&" + this.serialize(params);

		console.log("serialize: ",this.serialize(params));


		console.log("URL: ",url);
		return  fetch(url,{method: fetch_type}).then((response) => response.json())
	},

	serialize(obj, prefix) {
	  var str = [], p;
	  for(p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
	      str.push((v !== null && typeof v === "object") ?
	        this.serialize(v, k) :
	        encodeURI(k) + "=" + encodeURI(v));
	    }
	  }
	  return str.join("&");
	},

	get_dummy_purchases() {
		var url = 'http://admin.amul.cc.buildabazaar.com/api/v1/purchases/get_purchases.json?headers%5B_token%5D=df0a96ddbe1ada9fda4b1ed9b02cf67c&search%5Bemail_eq%5D=&search%5Bstatus_eq%5D=';

		var fetch_type = 'GET';
		return  fetch(url,{method: fetch_type}).then((response) => response.json())

	},

}

module.exports = api;

require('whatwg-fetch');
var NewsActions = require('../actions/NewsActions');


module.exports = {

	boot: function(page) {

		let pageNumber = page ? page : 1;
	    fetch('http://localhost.com:1337/news/get/?page=' + pageNumber)
	    .then(response => {
	      	return response.json();
	    })
	    .then(json => {
	    	NewsActions.loaded(json);
	      	return json;
	    }).catch(error => {
	      	console.log('Load news error', error);
	    });
	},

	get: function(page) {
	    fetch('http://localhost.com:1337/news/get/?page=' + page)
	    .then(response => {
	      	return response.json();
	    })
	    .then(json => {
	    	NewsActions.loaded(json);
	    }).catch(error => {
	      	console.log('Load news error', error);
	    });		
	}
};
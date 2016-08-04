require('whatwg-fetch');
var NewsActions = require('../actions/NewsActions');
const Router = require('../config/Router');

module.exports = {

	boot: function(page) {

		let pageNumber = page ? page : 1;
	    fetch(Router.getPath('news_page', {page: pageNumber}))
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
	    fetch(Router.getPath('news_page', {page: page}))
	    .then(response => {
	      	return response.json();
	    })
	    .then(json => {
	    	NewsActions.loaded(json);
	    }).catch(error => {
	      	console.log('Load news error', error);
	    });		
	},

	getOne: function(id) {
	    fetch(Router.getPath('news_get_by_id', {id: id}))
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
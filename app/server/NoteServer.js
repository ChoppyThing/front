require('whatwg-fetch');
var NoteActions = require('../actions/NoteActions');
const Router = require('../config/Router');


module.exports = {

	load: function(id) {
	    fetch(Router.getPath('news_get_by_id', {id: id}))
	    .then(response => {
	        return response.json();
	    })
	    .then(json => {
	      NoteActions.loaded(json);
	    }).catch(error => {
	        console.log('Load news error', error);
	    });
	},

	addComment: function(data) {
		fetch(Router.getPath('comment_add'), {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		}).then(function(response) {
			return response.json()
		}).then(function(json) {
			if (json.success) {
				NoteActions.getComments(json.news);
			}
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		});
	},

	getComments: function(note) {
	    fetch(Router.getPath('comments_get', {note: note}))
	    .then(response => {
	        return response.json();
	    })
	    .then(json => {
	      NoteActions.commentsLoaded(json);
	    }).catch(error => {
	        console.log('Load news error', error);
	    });
	}
};
require('whatwg-fetch');
var NoteActions = require('../actions/NoteActions');


module.exports = {

	load: function(id) {
	    fetch('http://localhost.com:1337/news/getone/?id=' + id)
	    .then(response => {
	        return response.json();
	    })
	    .then(json => {
	      NoteActions.loaded(json);
	    }).catch(error => {
	        console.log('Load news error', error);
	    });
	}
};
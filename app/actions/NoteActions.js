require('whatwg-fetch');
var Router = require('../config/Router');
var NoteConstants = require('../constants/NoteConstants');

var NoteActions = {
  getNote: function(id) {
    return fetch(Router.getPath('news_get_by_id', {id: id}));
  },

  postComment: function(comment) {
    return fetch(Router.getPath('comment_add'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });
  },

  load: function(id) {
    return function (dispatch) {
      return NoteActions.getNote(id)
      .then(response => response.json())
      .then(json => 
        dispatch(NoteActions.loaded(json))
      )
    }
  },

  addComment: function(comment) {
    return function (dispatch) {
      return NoteActions.postComment(comment)
      .then(response => response.json())
      .then(json => 
        dispatch(NoteActions.load(json.news))
      )
    }
  },

  loaded: function(note) {console.log('actiooqsd', note)
    return {
      type: NoteConstants.NOTE_LOAD,
      note: note
    }
  }
}

module.exports = NoteActions;

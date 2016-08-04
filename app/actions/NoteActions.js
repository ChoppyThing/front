var AppDispatcher = require('../dispatcher/AppDispatcher');
var NoteConstants = require('../constants/NoteConstants');
require('whatwg-fetch');

var NoteActions = {
  // When data is loaded
  loaded : function(data) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_LOAD,
      data: data
    });
  },

  // Comments handling
  addComment: function(comment) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.ADD_COMMENT,
      comment: comment
    });
  },

  getComments: function(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.GET_COMMENTS,
      note: note
    });
  },

  commentsLoaded: function(comments) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.SET_COMMENTS,
      comments: comments
    });    
  }
};

module.exports = NoteActions;
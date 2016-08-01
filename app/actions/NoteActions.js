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

  // Page change
  addComment: function(comment) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.ADD_COMMENT,
      comment: comment
    });
  }
};

module.exports = NoteActions;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');

var BookActions = {
  getAll : function(category) {
    AppDispatcher.dispatch({
      actionType: BookConstants.GET_ALL,
      category: category
    });
  },

  getById: function(book) {
    AppDispatcher.dispatch({
      actionType: BookConstants.GET_BY_ID,
      book: book
    });
  }
};

module.exports = BookActions;
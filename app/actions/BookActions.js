require('whatwg-fetch');
var Router = require('../config/Router');
var BookConstants = require('../constants/BookConstants');

var BookActions = {
  getCategories: function() {
    return fetch(Router.getPath('book_get_categories'));
  },

  getByCategory: function(id) {
    return fetch(Router.getPath('book_get_by_category', {category: id}));
  },

  loadCategories: function() {
    return function (dispatch) {
      return BookActions.getCategories()
      .then(response => response.json())
      .then(json => 
        dispatch(BookActions.loadedCategories(json))
      )
    }
  },

  loadedCategories: function(categories) {
    return {
      type: BookConstants.CATEGORIES_LOADED,
      categories: categories
    }
  },

  loadBook: function(id) {
    return function (dispatch) {
      return BookActions.getByCategory(id)
      .then(response => response.json())
      .then(json => 
        dispatch(BookActions.loadedBook(json))
      )
    }
  },

  loadedBook: function(book) {
    return {
      type: BookConstants.BOOK_LOADED,
      book: book
    }
  }
};

module.exports = BookActions;
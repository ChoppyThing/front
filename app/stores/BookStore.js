var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var BookServer = require('../server/BookServer');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = [];
var _book = {data: []};

var BookStore = assign({}, EventEmitter.prototype, {

  setCategories: function(categories) {
    _categories = categories;
  },

  setBook: function(book) {
    _book = book;
  },

  getCategories: function() {
    return _categories;
  },

  getBook: function() {
    return _book;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case BookConstants.GET_ALL:
        BookStore.setCategories(action.category);
        BookStore.emitChange();
    break;

    case BookConstants.GET_BY_ID:
        BookStore.setBook(action.book);
        BookStore.emitChange();
    break;

    default:
      // no op
  }
});

module.exports = BookStore;
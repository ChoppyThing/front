var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NewsConstants = require('../constants/NewsConstants');
var NewsServer = require('../server/NewsServer');
var assign = require('object-assign');
require('whatwg-fetch');

var CHANGE_EVENT = 'change';

var _newsList = {};

var NewsStore = assign({}, EventEmitter.prototype, {
  setNotes: function(data) {
    _newsList = data;
    return _newsList;
  },

  getNotes: function(data) {
    return _newsList;
  },

  fetchNotes: function(page) {
    NewsServer.get(page)
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
    case NewsConstants.NEWS_LOAD:
        NewsStore.setNotes(action.data);
        NewsStore.emitChange();
    break;

    case NewsConstants.PAGE_CHANGE:
        NewsStore.fetchNotes(action.page);
        NewsStore.emitChange();
    break;

    default:
      // no op
  }
});

module.exports = NewsStore;
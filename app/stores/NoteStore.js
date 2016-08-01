var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NoteConstants = require('../constants/NoteConstants');
var NoteServer = require('../server/NoteServer');
var assign = require('object-assign');
require('whatwg-fetch');

var CHANGE_EVENT = 'change';

var _note = {};

var NoteStore = assign({}, EventEmitter.prototype, {
  setNote: function(data) {
    _note = data;
    return _note;
  },

  getNote: function(data) {
    return _note;
  },

  fetchNote: function(id) {
    NoteServer.get(id);
  },

  fetchComments: function(id) {

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
    case NoteConstants.NOTE_LOAD:
        NoteStore.setNote(action.data);
        NoteStore.emitChange();
    break;

    case NoteConstants.ADD_COMMENT:
        NoteStore.fetchNote(action.comment);
        NoteStore.emitChange();
    break;

    case NoteConstants.GET_COMMENTS:
        NoteStore.fetchComments(action.id);
        NoteStore.emitChange();
    break;

    default:
      // no op
  }
});

module.exports = NoteStore;
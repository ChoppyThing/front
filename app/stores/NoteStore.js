var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NoteConstants = require('../constants/NoteConstants');
var NoteServer = require('../server/NoteServer');
var assign = require('object-assign');
require('whatwg-fetch');

var CHANGE_EVENT = 'change';

var _note = {};
var _comments = {};

var NoteStore = assign({}, EventEmitter.prototype, {
  setNote: function(data) {
    _note = data;
    _comments = data.comments;
    return _note;
  },

  getNote: function(data) {
    return _note;
  },

  fetchNote: function(id) {
    NoteServer.get(id);
  },

  setComments: function(comments) {
    _comments = comments;
    return _comments;
  },

  getComments: function() { 
    if (Object.keys(_comments).length > 0) {
      return _comments;
    }
    return false;
  },

  addComment: function(comment) {
    NoteServer.addComment(comment);
  },

  fetchComments: function(note) {
    NoteServer.getComments(note);
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
        NoteStore.addComment(action.comment);
        NoteStore.emitChange();
    break;

    case NoteConstants.GET_COMMENTS:
        NoteStore.fetchComments(action.note);
        NoteStore.emitChange();
    break;

    case NoteConstants.SET_COMMENTS:
        NoteStore.setComments(action.comments);
        NoteStore.emitChange();
    break;

    default:
      // no op
  }
});

module.exports = NoteStore;
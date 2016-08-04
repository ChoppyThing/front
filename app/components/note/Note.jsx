var React = require('react');
var NoteStore = require('../../stores/NoteStore');
var NoteServer = require('../../server/NoteServer');
var NoteActions = require('../../actions/NoteActions');
var Comment = require('./Comment');

function getNote() {
  let note = NoteStore.getNote();
  return {
    note : note
  }
}

function getComments() {
  return NoteStore.getComments();
}

var Note = React.createClass({
  getInitialState: function() {
    NoteServer.load(this.props.params.note);
    return {
      note: {}
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  handleComments: function() {
    let comments = getComments();

    let note = {note: this.state.note};
    note.note.comments = comments;

    if (comments) {
      this.setState(note);
    }
  },

  render: function() {

    let comments = [];
    let commentList = this.state.note.comments;

    if (commentList != undefined) {
      commentList.forEach(function(value) {
        comments.push(value);
      });
    }

    return (
      <div className="blog">
        Note Info{this.props.params.note}<br/><br/>

        {this.state.note.title}<br/>
        {this.state.note.text}<br/>
        <hr/>
       
        <div className="">
          {comments.map(comment => {
              return (
                <div key={comment.id}>
                  {comment.name}<br/>
                  {comment.comment}<br/><br/>
                </div>
              );
          })}
        </div>
        <br/><br/>

        <Comment note={this.props.params.note}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getNote());
    this.handleComments();
  }
});


module.exports = Note;
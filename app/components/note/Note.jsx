var React = require('react');
var NoteStore = require('../../stores/NoteStore');
var NoteServer = require('../../server/NoteServer');
var NoteActions = require('../../actions/NoteActions');

function getNote() {
  let note = NoteStore.getNote();
  return {
    note : note
  }
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
      </div>
    );
  },

  _onChange: function() {
    this.setState(getNote());
  }
});


module.exports = Note;
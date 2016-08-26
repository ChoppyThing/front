var React = require('react');
var connect = require('react-redux').connect;
var NoteActions = require('../../actions/NoteActions');
var Comment = require('./Comment');


var Note = React.createClass({
  getInitialState: function() {
    this.props.dispatch(NoteActions.load(this.props.params.note));
    return {note : []};
  },

  render: function() {
    var { note } = this.props;

    if (note == undefined) {
      note = [];

    }

    let comments = [];
    let commentList = note.comments;

    if (commentList != undefined) {
      commentList.forEach(function(value) {
        comments.push(value);
      });
    }

    return (
      <div className="blog">
        Note Info{this.props.params.note}<br/><br/>

        {note.title}<br/>
        {note.text}<br/>
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

 <pre>{/* JSON.stringify(this.props, null, 2) */}</pre>
      </div>
    );
  },

});


const mapStateToProps = (state/*, props*/) => { console.log(state)
  return {
    note: state.blog.note,
  }
}

const ConnectNote = connect(mapStateToProps)(Note)

module.exports = ConnectNote;
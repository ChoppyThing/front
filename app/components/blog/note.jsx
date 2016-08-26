var React = require('react');
var Link = require('react-router').Link

var Note = React.createClass({
  render: function() {
    var noteNodes = this.props.notes.map(function(note){
        return (
          <div key={note.id}>
            {note.title} <br/>
            {note.text} <br/>

            <Link to={`/blog/note/${note.id}`}>Voir</Link>
            <br/><br/>
          </div>
        );
    });

    return (
        <div className="note">
            {noteNodes}
        </div>
    );
  }
});

module.exports = Note;
var React = require('react');

var Note = React.createClass({
  render: function() {
    var noteNodes = this.props.notes.map(function(note){
        return (
          <div key={note.id}>
            {note.title}
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
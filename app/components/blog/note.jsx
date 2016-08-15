var React = require('react');
var Link = require('react-router').Link
var moment = require('moment');

var Note = React.createClass({
  render: function() {
    var noteNodes = this.props.notes.map(function(note){
        return (
          <div className="note-panel" key={note.id}>
            <img className="note-icon" src="/public/img/icon_blog.png" alt="Blog post"/>
            <h2>
              {note.title}
            </h2>

            <span className="date">
              {(moment(note.cdate)).locale('fr').format('Do MMMM YYYY')}
            </span>

            <p dangerouslySetInnerHTML={{__html: note.text}}></p>

            <Link to={`/blog/note/${note.id}`}>Voir</Link>
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
var React = require('react');

var NoteActions = require('../../actions/NoteActions');



var Comment = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      text: ''
    };
  },

  handleSubmit: function() {
    console.log(this.state);
    // ACTION HERE !!!
  },

  handleChange: function(event) {
    let field = event.target.name;
    this.setState({[field]: event.target.value});
  },

  render: function() {
    return (
      <div className="comment-writer">
        Nom<br/>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/><br/>

        Commentaire<br/>
        <textarea name="text" value={this.state.text} onChange={this.handleChange}></textarea>
        <br/>
        <input type="submit" onClick={this.handleSubmit} value="Envoyer"/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getNote());
  }
});


module.exports = Comment;
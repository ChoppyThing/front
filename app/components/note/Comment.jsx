var React = require('react');
var connect = require('react-redux').connect;
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
    let comment = this.state;
    comment.news_id = this.props.note;

    this.props.dispatch(NoteActions.addComment(comment));
  },

  handleChange: function(event) {
    let field = event.target.name;
    this.setState({[field]: event.target.value});
  },

  render: function() {
    return (
      <div className="comment-writer"> {this.props.note}
        Nom<br/>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/><br/>

        Commentaire<br/>
        <textarea name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
        <br/>
        <input type="submit" onClick={this.handleSubmit} value="Envoyer"/>
      </div>
    );
  },
});

const mapStateToProps = (state/*, props*/) => {
  return {}
}

const ConnectComment = connect(mapStateToProps)(Comment)

module.exports = ConnectComment;
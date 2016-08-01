var React = require('react');
var HeadMenu = require('../blog/head_menu');
var Col = require('react-bootstrap').Col;
var NewsServer = require('../../server/NewsServer');


var Note = React.createClass({
  getInitialState: function() {
    return {
      note: {}
    };
  },

  componentDidMount: function() {
    let id = this.props.params.note;

    fetch('http://localhost.com:1337/news/getone/?id=' + id)
    .then(response => {
        return response.json();
    })
    .then(json => {
      this.setState({note: json});
    }).catch(error => {
        console.log('Load news error', error);
    });
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
        <Col md={8} mdOffset={2}>
          <HeadMenu />

           Note Info<br/><br/>

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

        </Col>
      </div>
    );
  }
});


module.exports = Note;
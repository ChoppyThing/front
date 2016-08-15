var React = require('react');
var Link = require('react-router').Link
var Note = require('./note');
var Page = require('./page');
var NewsStore = require('../../stores/NewsStore');
var NewsServer = require('../../server/NewsServer');

require('whatwg-fetch');


function getNewsState() {
  let notes = NewsStore.getNotes();

  return {
    notes: notes.data,
    total: notes.total,
    number: notes.number
  }
}

var Blog = React.createClass({
  getInitialState: function() {
    NewsServer.boot(this.props.params.page);
    return {
      notes: []
    };
  },
  componentDidMount: function() {
    // Moved to getInitialState temporarily to see if this doesn't cause any loading side effect
    // NewsServer.boot(this.props.params.page);
    NewsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NewsStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function(prevProps, prevState){
    // this.state.page = this.props.params.page;
  },

  render: function() {
    return (
      <div className="blog">
        <Note notes={this.state.notes} />
        
        <Page 
          page={this.props.params.page}
          total={this.state.total}
          number={this.state.number}
        />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getNewsState());
  }
});

module.exports = Blog;
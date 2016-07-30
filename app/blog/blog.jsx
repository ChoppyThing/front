var React = require('react');
var Link = require('react-router').Link
var Note = require('./note');
var Page = require('./page');
var HeadMenu = require('./head_menu');
var Col = require('react-bootstrap').Col;

require('whatwg-fetch');

var Blog = React.createClass({
  getInitialState: function() {
    return {
      notes: []
    };
  },
  componentDidMount: function() {
    this.setState({page: 1});
    this.getNews();
  },

  componentDidUpdate: function(prevProps, prevState){
    if (this.state.page != this.props.params.page) {
      this.state.page = this.props.params.page;
      this.getNews();
    }
  },

  getNews: function() {
    var page = this.state.page;
    
    fetch('http://localhost.com:1337/news/get/?page='+page)
    .then(response => {
      return response.json()
    }).then(json => {
      this.setState({notes: json.data});
      this.setState({total: json.total});
      this.setState({number: json.number});
    }).catch(error => {
      this.setState({notes: [{title: 'Une erreur est survenue.'}]});
    });
  },

  render: function() {
    return (
      <div className="blog">
        <Col md={8} mdOffset={2}>
          <HeadMenu />

           Blog

          <Note notes={this.state.notes} />
          
          <Page 
              page={this.props.params.page}
              total={this.state.total}
              number={this.state.number}
          />
          {this.props.params.page}

          <Link to={`/`}>Is that ?</Link>
        </Col>
      </div>
    );
  }
});

module.exports = Blog;
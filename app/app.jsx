var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;

var Blog = require('./components/blog/blog');
var Page = require('./components/blog/page');
var Note = require('./components/note/Note');
var Book = require('./components/book/Book');
var Layout = require('./components/utils/Layout');

require('whatwg-fetch');


var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        
        <div className="main">
          <Link to={`/blog`}>Is that ?</Link>
        </div>
        {this.props.children}

      </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route component={Layout}>
      <Route path="/blog" component={Blog}>
        <Route path="/blog/page/:page" component={Page}/>
      </Route>
      <Route path="/blog/note/:note" component={Note}/>
    </Route>
    <Route path="/book" component={Book}>
      <Route path="/book/:category" component={Book}/>
    </Route>
  </Router>),
  document.getElementById('app')
);
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;

var Blog = require('./blog/blog');

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
    <Route path="/blog" component={Blog}>
      <Route path="/blog/page/:page" component={Blog}/>
    </Route>
</Router>),
  document.getElementById('app')
);
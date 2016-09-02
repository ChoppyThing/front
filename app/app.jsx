var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var Layout = require('./components/utils/Layout');
var browserHistory = require('react-router').browserHistory;
var Blog = require('./components/blog/blog');
var Note = require('./components/note/Note');
var Book = require('./components/book/Book');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
var routerReducer = require('react-router-redux').routerReducer;
var ReduxThunk = require('redux-thunk').default;
var NewsReducer = require('./reducers/NewsReducer');
var BookReducer = require('./reducers/BookReducer');

var blog = NewsReducer.reducer;
var book = BookReducer.reducer;
const store = createStore(
  combineReducers({
    blog,
    book,
    routing: routerReducer
  }),
  applyMiddleware(ReduxThunk)
);

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

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}/>
        <Route component={Layout}>
          <Route path="/blog" component={Blog}>
            <Route path="/blog/page/:page" component={Blog}/>
          </Route>
          <Route path="/blog/note/:note" component={Note}/>
        </Route>
        <Route path="/book" component={Book}>
          <Route path="/book/:category" component={Book}/>
        </Route>
    </Router>
  </Provider>),
  document.getElementById('app')
);

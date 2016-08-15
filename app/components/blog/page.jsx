var React = require('react');
var Link = require('react-router').Link
var NewsActions = require('../../actions/NewsActions');

var Page = React.createClass({
  getInitialState: function() {
    return {
      currentPage: 0
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.props.page != nextProps.page) {
      NewsActions.pageChange(nextProps.page);
    }
  },

  componentDidUpdate: function(nextProps, nextState) {
    if (nextProps.page != nextState.currentPage) {
      this.setState({currentPage: nextProps.page});
    }
  },

  render: function() {
    var pages = [], i = 0;
    var pagesNumber = this.props.total / this.props.number;

    while (i++ <= pagesNumber) {
      pages.push(i);
    }

    return (
        <nav className="page" aria-label="Page navigation">
          <ul className="pagination">
            {pages.map(page => {
                return (
                  <li className={(this.state.currentPage == page) ? 'active' : ''} key={page}>
                    <Link to={`/blog/page/${page}`}>{page}</Link>
                  </li>
                );
            })}
          </ul>
        </nav>
    );
  }
});

module.exports = Page;
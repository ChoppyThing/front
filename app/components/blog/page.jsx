var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link
var NewsActions = require('../../actions/NewsActions');

var Page = React.createClass({

  componentDidUpdate: function(nextProps, nextState) {
    if (this.props.currentPage != nextProps.currentPage) {
      this.props.dispatch(NewsActions.pageChange(this.props.currentPage));
    }
  },

  render: function() {
    var pages = [], i = 0;
    var pagesNumber = this.props.total / this.props.number;

    while (i++ <= pagesNumber) {
      pages.push(i);
    }

    return (
        <div className="page">
            {pages.map(page => {
                return <Link key={page} to={`/blog/page/${page}`}>{page}</Link>
            })}
        </div>
    );
  }
});

const mapStateToProps = (state) => {
  // Pages are intentially passed by props.
  // This is only used to inject dispatch, to call pageChange action...
  return {}
}

const ConnectPage = connect(mapStateToProps)(Page)

module.exports = ConnectPage;

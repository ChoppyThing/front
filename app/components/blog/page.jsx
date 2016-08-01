var React = require('react');
var Link = require('react-router').Link
var NewsActions = require('../../actions/NewsActions');

var Page = React.createClass({

  componentWillUpdate: function(nextProps, nextState){
    if (this.props.page != nextProps.page) {
      NewsActions.pageChange(nextProps.page);
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

module.exports = Page;
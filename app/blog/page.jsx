var React = require('react');
var Link = require('react-router').Link

var Page = React.createClass({
  render: function() {
    var pages = [], i = 0;
    var pagesNumber = this.props.total / this.props.number;

    while (i++ <= pagesNumber) {
      pages.push(i);
    }

    return (
        <div className="page">
            {pages.map(function(page) {
                return <Link key={page} to={`/blog/page/${page}`}>{page}</Link>
            })}
        </div>
    );
  }
});

module.exports = Page;
var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link
var NewsActions = require('../../actions/NewsActions');

var Note = require('./note');
var Page = require('./page');


var Blog = React.createClass({
  getInitialState: function() {
    this.props.dispatch(NewsActions.load());
    return {news : []};
  },

  render: function() {
    var { news, reduxState } = this.props;
    var notes = [];
    var parameters = {};

    if (news != undefined) {
      notes = news.data;
      parameters = news;
    }

    return (
      <div className="blog">
        Blogs
        <Note notes={notes} />

        <Page 
          page={parameters.page}
          total={parameters.total}
          number={parameters.number}
          currentPage={this.props.params.page}
        />

        {this.props.params.page} Hello Blas

        <Link to={`/`}>Is that ?</Link>

        <br/>
        <pre>
          {/* JSON.stringify(reduxState, null, 2) */}
        </pre>
      </div>
    );
  }
});

const mapStateToProps = (state/*, props*/) => {
  return {
    news: state.blog.news,
    reduxState: state,
  }
}

const ConnectBlog = connect(mapStateToProps)(Blog)

module.exports = ConnectBlog;
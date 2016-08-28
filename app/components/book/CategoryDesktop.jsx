var React = require('react');
var Link = require('react-router').Link

var CategoryDesktop = React.createClass({

  getInitialState: function() {
    return {
      categories: []
    };
  },

  componentDidUpdate: function(prevProps, prevState){
    if (prevProps.categories !== prevState.categories) {
      this.setState({categories: this.props.categories});
    }
  },

  render: function() {
    return (
      <div className="category-panel" style={{height: '5%'}}>
        <ul>
          {this.state.categories.map(category => {
            return (
              <li key={category.id}>
                <Link to={`/book/${category.id}`}>{category.name}</Link>
                <span className="separator"> | </span>
              </li>
            );
          })}

          <li>
            <Link to={`/`}>Chuck ?</Link>
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = CategoryDesktop;
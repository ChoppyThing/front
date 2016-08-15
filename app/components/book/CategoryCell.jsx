var React = require('react');
var Link = require('react-router').Link

var CategoryCell = React.createClass({

  getInitialState: function() {
    return {
      categories: [],
      menuOpen: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.categories !== prevState.categories) {
      this.setState({categories: this.props.categories});
    }
  },

  render: function() {
    var menuState = this.state.menuOpen;

    return (
      <div className="cell-menu" style={{background: menuState ? 'rgba(0, 0, 0, 0.7)' : 'none', border: menuState ? '2px solid black' : 'none'}}>
        <button 
          onClick={() => {
            
            this.setState({menuOpen: menuState ? false : true});
          }}
          className="btn btn-info bio-burger"
        >
          <i className={'fa ' + (menuState ? 'fa-times' : 'fa-bars')} aria-hidden="true"></i>
        </button>

        <ul style={{display: (this.state.menuOpen ? 'block' : 'none')}}>
          {this.state.categories.map(category => {
            return (
              <li key={category.id}>
                <span>
                  <i className="fa fa-camera-retro" aria-hidden="true"></i>
                  <Link to={`/book/${category.id}`}>{category.name}</Link>
                </span>
                <hr/>
              </li>
            );
          })}

          <li>
            <span>
              <i className="fa fa-home" aria-hidden="true"></i>
              <Link to={`/`}>Chuck ?</Link>
            </span>
          </li>
        </ul>

      </div>
    );
  },
});

module.exports = CategoryCell;
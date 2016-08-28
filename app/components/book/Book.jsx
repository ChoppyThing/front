var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var connect = require('react-redux').connect;
var Link = require('react-router').Link
var BookActions = require('../../actions/BookActions');
var browserHistory = require('react-router').browserHistory;
var Col = require('react-bootstrap').Col;
var CategoryMobile = require('./CategoryMobile');
var CategoryDesktop = require('./CategoryDesktop');


var Book = React.createClass({

  getInitialState: function() {
    this.props.dispatch(BookActions.loadCategories());

    return {
      categories: [],
      book: {data: []},
      position: 1
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.categories && prevProps.categories == undefined) {
      let category = this.props.categories[0].id
      this.props.dispatch(BookActions.loadBook(category));
      this.navigation();
    }

    if (prevProps.photos == undefined && this.props.photos!= undefined) {
      this.navigation();
    }

    if (prevState.position != this.state.position) {
      this.navigation();
    }
  },

  photosNumber: function() {
    if (this.props.photos != undefined) {
      return this.props.photos.data.length;
    }
    return 0;
  },

  getPosition: function(photo) {
    return this.props.photos.data.indexOf(photo);
  },

  navigation: function() {
    let position = this.state.position;
    if (position > 0) {
      this.setState({left: (position - 1)});
    } else {
      this.setState({left: undefined});
    }

    if (position < (this.photosNumber() - 1)) {
      this.setState({right: (position + 1)});
    } else {
      this.setState({right: undefined});
    }
  },

  move: function(position) {
    if (position >= 0 || position <= this.photosNumber()) {
      this.setState({position: position});
    }
  },


  render: function() {
    var photo = '';
    var photos = [];
    var left = this.state.left;
    var right = this.state.right;
    var position = this.state.position;


    if (this.props.photos != undefined) {
      photos = this.props.photos.data;
    }


    var { categories, reduxState } = this.props;

    return (
        <div className="note"> qsd{ left }
          {/*JSON.stringify(this.state)*/}

          <CategoryMobile categories={categories}/>

          <div className="navigation">
            <div className="nav-btn">
              <i
                style={{
                  color: (left != undefined) ? '#96c6cb': '#e7e8e9',
                  cursor: (left != undefined) ? 'pointer': 'not-allowed',
                }}
                onClick={() => this.move(left)}
                className="fa fa-chevron-left left"
                aria-hidden="true">
              </i>

              <i
                style={{
                  color: (right != undefined) ? '#96c6cb': '#e7e8e9',
                  cursor: (right != undefined) ? 'pointer': 'not-allowed',
                }}
                onClick={() => this.move(right)}
                className="fa fa-chevron-right right"
                aria-hidden="true">
              </i>
            </div>
          </div>

          <div className="image-panel">
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {photos.map(photo => {
                return (
                  <img key={photo.id} className="img-responsive"
                    style={{display: (this.state.position == this.getPosition(photo) ? 'block' : 'none'), margin: '0 auto', maxWidth: '100%', maxHeight: '100%'}} 
                    src={photo.url}
                  />
                );
              })}
            </ReactCSSTransitionGroup>
          </div>

        <pre>
          {/* JSON.stringify(reduxState, null, 2) */}
        </pre>

          <CategoryDesktop categories={categories}/>

          <div style={{display: 'none'}} className="preload">
            {photos.map(photo => {
              return (
                <img key={photo.id} src={photo.url}/>
              );
            })}
          </div>
        </div>
    );
  },
});

const mapStateToProps = (state/*, props*/) => {
  return {
    categories: state.book.categories,
    photos: state.book.photos,
    reduxState: state,
  }
}

const ConnectBook = connect(mapStateToProps)(Book)

module.exports = ConnectBook;
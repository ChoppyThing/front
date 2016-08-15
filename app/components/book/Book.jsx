var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Link = require('react-router').Link
var BookStore = require('../../stores/BookStore');
var BookServer = require('../../server/BookServer');
var browserHistory = require('react-router').browserHistory;
var Col = require('react-bootstrap').Col;
var CategoryCell = require('./CategoryCell');
var CategoryDesktop = require('./CategoryDesktop');

function getBookState() {
  let categories = BookStore.getCategories();
  let book = BookStore.getBook();

  console.log('hey', categories, book);

  return {
    categories: categories,
    book: book
    // book: notes.number
  }
}

var Book = React.createClass({

  getInitialState: function() {
    BookServer.getCategories();

    return {
      categories: [],
      book: {data: []}
    };
  },

  componentDidUpdate: function(prevProps, prevState){
    if (this.state.book.category != this.props.params.category) {
      BookServer.getByCategory(this.props.params.category);
    }

    if (this.state.book.category == undefined && this.props.params.category == undefined) {
      if (this.state.categories[0] != undefined) {
        let categoryId = this.state.categories[0].id;
        browserHistory.push('/book/' + categoryId);
      }
    }
  },

  componentDidMount: function() {
    BookStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this._onChange);
  },

  getCurrentPhoto: function() {
    if (this.state.book.data != undefined) {
      let defaultPosition = 0;
      return this.state.book.data[defaultPosition];
    }
  },

  getDefaultLeft: function() {
    return false;
  },

  getDefaultRight: function() {
    var count = this.state.book.data.length;
    if (0 < count) {
      return true;
    }
    return false;
  },

  setPhoto: function(photo) {
    this.setState({photo: photo});
  },

  setNavigation: function(newPosition) {
    var count = this.state.book.data.length - 1;

    if (newPosition > 0) {
      this.setState({leftNav: true});
    } else {
      this.setState({leftNav: false});
    }

    if (newPosition < count) {
      this.setState({rightNav: true});
    } else {
      this.setState({rightNav: false});
    }
  },

  move: function(direction, photo, active) {
    let position = this.state.book.data.indexOf(photo);
    let newPosition = null;

    if (active) {
      if (direction === 'left') {
        newPosition = position - 1;
      } else if (direction === 'right') {
        newPosition = position + 1;
      }

      this.setPhoto(this.state.book.data[newPosition]);
      this.setNavigation(newPosition);
    }
  },

  render: function() {

    var photo = this.state.photo;
    var right = this.state.rightNav;
    var left = this.state.leftNav;
    if (photo == undefined) {
      photo = this.getCurrentPhoto();
      left = this.getDefaultLeft();
      right = this.getDefaultRight();
    }

    return (
        <div className="note">
          {/*JSON.stringify(this.state)*/}

          <CategoryCell categories={this.state.categories}/>

          <div className="navigation">
            <div className="nav-btn">
              <i 
                style={{
                  color: left ? '#96c6cb': '#e7e8e9',
                  cursor: left ? 'pointer': 'not-allowed',
                }}
                onClick={() => this.move('left', photo, left)}
                className="fa fa-chevron-left left"
                aria-hidden="true">
              </i>

              <i
                style={{
                  color: right ? '#96c6cb': '#e7e8e9',
                  cursor: right ? 'pointer': 'not-allowed',
                }}
                onClick={() => this.move('right', photo, right)}
                className="fa fa-chevron-right right"
                aria-hidden="true">
              </i>
            </div>
          </div>

          <div className="image-panel">
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              <img className="img-responsive"
                style={{display: (photo ? 'block' : 'none'), margin: '0 auto', maxWidth: '100%', maxHeight: '100%'}} 
                src={photo ? photo.url : ''}
              />
            </ReactCSSTransitionGroup>
          </div>

          <CategoryDesktop categories={this.state.categories}/>

          <div style={{display: 'none'}} className="preload">
            {this.state.book.data.map(photo => {
              return (
                <img key={photo.id} src={photo.url}/>
              );
            })}
          </div>
        </div>
    );
  },

  _onChange: function() {
    this.setState(getBookState());
  }
});

module.exports = Book;
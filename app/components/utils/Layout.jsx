var React = require('react');
var HeadMenu = require('./HeadMenu');
var Col = require('react-bootstrap').Col;

var Layout = React.createClass({
  render: function() {
    return (
      <div className="blog">
        <Col md={8} mdOffset={2}>
          <HeadMenu />
          {this.props.children}
        </Col>
      </div>
    );
  }
});


module.exports = Layout;
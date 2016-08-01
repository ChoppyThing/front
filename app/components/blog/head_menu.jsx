/**
 * TODO MOVE THIS FILE TO A GLOBAL SPACE
 */
var React = require('react');
var Link = require('react-router').Link

var HeadMenu = React.createClass({
	render: function() {
		return (
			<div className="head-menu">
				<ul>
					<li>
						<b>
							<Link to={`/`}>Accueil</Link>
						</b>
					</li>
					<li>
						<b>
							<Link to={`/blog`}>Blog</Link>
						</b>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = HeadMenu;
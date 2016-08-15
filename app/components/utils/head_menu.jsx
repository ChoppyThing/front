var React = require('react');
var Link = require('react-router').Link

var HeadMenu = React.createClass({
	render: function() {
		return (
			<div className="head-menu">
				<ul>
					<li>
						<b>
							<Link to={`/`}>
								<i className="fa fa-home"></i>
								Accueil
							</Link>
						</b>
					</li>
					<li className="separator"> | </li>
					<li>
						<b>
							<Link to={`/blog`}>
								<i className="fa fa-newspaper-o" aria-hidden="true"></i>
								Blog
							</Link>
						</b>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = HeadMenu;
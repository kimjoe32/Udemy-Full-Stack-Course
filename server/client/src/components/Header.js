import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent() {
		// console.log("Header: renderContent()");
		switch(this.props.auth) {
			case null: //waiting to auth user
				return;

			case false:// user not logged in 
				return <li> <a href="/auth/google">Sign in With Google</a></li>;

			default: //user is logged in
				return [
					<li key='1'><Payments /></li>,
					<li key='2' style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key='3'><a href="/api/logout">Logout</a></li>
				];
		}
	}
	render() {
		// console.log("Header: render()");
		/*
			renderContent() output placed at <ul className="right">, 
		*/
		return (
			<nav>
				<div className="nav-wrapper">
					<Link 
					to={this.props.auth ? '/surveys': '/'} 
					className="left brand-logo"
					>
						Emaily
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}
function mapStateToProps({auth}) {
	// console.log("Header: mapStateToProps");
	return { auth };
}
export default connect(mapStateToProps)(Header);
import "./Navigation.scss";
import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";


class Navigation extends Component {
	render() {
		const { cartTotal } = this.props;
		const links = [{
			to: "/",
			text: "Home",
		}, {
			to: "/All",
			text: "All Items",
		// }, {
		// 	to: "/Cart",
		// 	text: "Cart",
		}];
		return (
			<div className="navbar-fixed">
				<nav className="Nav nav-wrapper">
					<h3 className="left title">Watches n' Sh*t</h3>
					<div className="right">

						{links.map((link) => {
							return (
								<NavLink
									key={link.to}
									to={link.to}
									className="Nav-link"
								>
									{link.text}
								</NavLink>
							);
						})}
						<Link to={"/Cart"}>
							<button className="waves-effect waves-light btn cart">
								<h6 className="cart-total center">{cartTotal}</h6>
								<i className="cart-icon material-icons center">shopping_cart</i>

							</button>
						</Link>
					</div>
				</nav>
			</div>

		);
	}
}

function mapStateToProps(state, props) {
	return {
		cartTotalItems: state.cart.cartTotal,
	};
}

export default connect(mapStateToProps) (Navigation);

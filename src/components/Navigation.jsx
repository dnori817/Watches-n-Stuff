import "./Navigation.scss";
import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
import { Link, NavLink } from "react-router-dom";

class Navigation extends Component {
	render() {
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
							<a className="waves-effect waves-light btn cart">
								<h6 className="cart-total center">{this.props.cartTotal}</h6>
								<i className="cart-icon material-icons center">shopping_cart</i>

							</a>
						</Link>
					</div>
				</nav>
			</div>

		);
	}
}

export default Navigation;

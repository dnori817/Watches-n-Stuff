import "./Navigation.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
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
			<nav className="Nav">
				<h3 className="left">Watches n' Shit</h3>
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
					<Link to={"./Cart"}>
					<a className="waves-effect waves-light btn cart">
						<i className="large material-icons cart-icon">shopping_cart
						</i><h5>0</h5></a>
					</Link>
				</div>
			</nav>

		);
	}
}

export default Navigation;

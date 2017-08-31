import "./404.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";

class FourOhFour extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col s1"/>
					<h1 className="col s10 center">PAGE NOT FOUND!</h1>
					<div className="col s1"/>
				</div>
				<div className="row">
					<div className="col s1"/>
					<div className="col s10 center">

						{/* <img
							className="delivery-img"
							src="src/assets/images/delivery.gif"
						/> */}
					</div>
					<div className="col s1"/>
				</div>
			</div>
		);
	}
}

export default FourOhFour;

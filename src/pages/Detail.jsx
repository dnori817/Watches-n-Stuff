import "./Detail.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";

class Detail extends Component {
	constructor(props) {
		super(props);
	}
	_handleClick = (productId) => {
		this.props.addToCart(this.props.product.id);
	};
	render() {
		const { product } = this.props;
		return (
			<div className="Detail">
				<img src={product.images[0].large}/>
				<h1>{product.name}</h1>
				<h2>${product.price}</h2>
				<a className="waves-effect waves-light btn cart-add left" value = {product.id} onClick = {this._handleClick}>
					Add to Cart
				</a>


				<h5 className="left">{product.description}</h5>
			</div>
		);
	}
}

export default Detail;

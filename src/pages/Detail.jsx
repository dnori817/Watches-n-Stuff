import "./Detail.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";
import { getProduct } from "actions/products";
import { addToCart } from "actions/cart";
import PropTypes from "prop-types";
import Loader from "components/Loader.jsx";
import { connect } from "react-redux";

class Detail extends Component {
	componentDidMount() {
		this.props.getProduct(this.props.productId);
	}

	_handleClick = (product) => {
		this.props.addToCart(this.props.product);
	};

	render() {
		const { product, isLoading, error, cart, cartTotal } = this.props;
		let content;
		if (isLoading) {
			content = <Loader/>;
		}
		else if (!product) {
			content = <div className =""> { error } </div>;
		}
 		else {
			content = (
				<div className="Detail">
					<img src={product.image.large}/>
					<h1>{product.name}</h1>
					<h2>${product.price}</h2>
					<button
						className="waves-effect waves-light btn cart-add left"
						value = {product}
						onClick = {this._handleClick}
					>
					Add to Cart
					</button>
					<h5 className="left">{product.description}</h5>
				</div>
			);
		}
		return (
			<div className= "Product">
				{ content }
			</div>
		);
	}
}


function mapStateToProps(state, props) {
	const { selectedProduct } = state.products;
	return {
		productId: props.match.params.productId,
		product: selectedProduct,
		cart: state.cart,
		cartTotal: state.cart,
	};
}

export default connect(mapStateToProps, { getProduct, addToCart }) (Detail);

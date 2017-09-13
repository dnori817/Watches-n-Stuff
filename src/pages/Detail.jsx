import "./Detail.scss";
import React, { Component } from "react";
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
					<img className="right" src={product.images[0].large}/>
					<h1 className="name">{product.name}</h1>
					<h2 className="price">${product.price}</h2>
					<button

						className="waves-effect waves-light btn cart-add left"
						value = {product}
						onClick = {this._handleClick}

					>
					Add to Cart
					</button>
					<h5 className="desc right">{product.description}</h5>
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
	const { selectedProduct, isLoading, error } = state.products;
	return {
		productId: props.match.params.productId,
		product: selectedProduct,
		cart: state.cart,
		cartTotal: state.cart,
		isLoading,
		error,
	};
}

export default connect(mapStateToProps, { getProduct, addToCart }) (Detail);

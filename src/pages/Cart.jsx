import "./Cart.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";
import { connect } from "react-redux";



class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { cartTotal, cart } = this.props;
		const total = cart.reduce(function(prev, product) {
			return prev + parseFloat(product.price);
		},0);


		return (
			<div className="row">
				<div className="col s3"/>

				<div className="col s6">
					{/* <h1 className="center">Your Cart is Empty</h1>; */}
					{cart.map((product) => {
						return (
							<div className="cart-row">
								<h4 className="">{product.name}</h4>
								<img className="" src={product.images[0].small}/>
								<h3 className="right">${product.price}</h3>
							</div>


						);
					})}
					<h4 className="total">Total: ${total}.00</h4>
					<Link to={"/Checkout"}>
						<button className="waves-effect waves-light btn center Checkout">
							Checkout
						</button>
					</Link>
				</div>
				<div className="col s3"/>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		cartTotal: state.cart.cartTotal,
		cart: state.cart.cart,
	};
}


export default connect (mapStateToProps) (Cart);

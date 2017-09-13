import "./Checkout.scss";
import React, { Component } from "react";
import { submitOrder } from "actions/checkout.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class Checkout extends Component {
	// componentDidMount() {
	// 	this.props.submitOrder();
	// }
	constructor(props) {
		super(props); {
			this.state = {
				name: "",
				address: "",
				city: "",
				state: "",
				zipCode: "",
				error: null,
			};
		}
	}
	_handleChange = (ev) => {
		this.setState({
			[ev.target.name]: [ev.target.value].toString() });
	}

	_handleSubmit = (ev) => {
		ev.preventDefault();
		const { cart, cartTotal } = this.props;
		this.props.submitOrder(this.state);
	}

	render() {
		const { name, address, zipCode, city, state, value } = this.state;
		const { error, orderSuccess, orderFailure, cart, cartTotal } = this.props;

		let message;

		if (orderSuccess) {
			message = (
				<div className = "center OrderSuccess">
					<h2>Your Order is on the Way!</h2>
					<Link to= "/All">Continue Shopping</Link>

				</div>
			);
		}

		if (orderFailure) {
			message = <div className = "OrderFail"> { error } </div>;
		}

		if (cartTotal === 0) {
			return (
				<div className = "center empty">
					<h1>Your Cart is Empty</h1>
					<h3><Link to= "/All">Continue Shopping</Link></h3>
				</div>
			);
		} else {
			return (
				<form onSubmit={this._handleSubmit}>
					<div className="row">
						<div className="col s12"/>
					</div>
					<div className="row">
						<div className="col s3"/>
						<div className="input-field col s6">
							<input id="name" className="validate" type="text"
								name = "name"
								label='Full Name'
								onChange={this._handleChange}
								required
							/>
							<label htmlFor="name">Full Name</label>
						</div>
						<div className="col s3"/>
					</div>
					<div className="row">
						<div className="col s3"/>
						<div className="input-field col s6">
							<input id="address" className="validate" type="text"
								name = "address"
								label='Street Address'
								onChange={this._handleChange}
								required
							/>
							<label htmlFor="address">Street Address</label>

						</div>
						<div className="col s3"/>
					</div>
					<div className="row">
						<div className="col s3"/>
						<div className="input-field col s2">
							<input id="city" className="validate" type="text"
								name = "city"
								label='City'
								onChange={this._handleChange}
								required
							/>
							<label htmlFor="city">City/Town</label>
						</div>

						<div className="input-field col s2">
							{/* <select defaultValue="sel">
								<option value="sel" disabled>Select...</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
								<option value="AZ">Arizona</option>
								<option value="AR">Arkansas</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DE">Delaware</option>
								<option value="DC">District Of Columbia</option>
								<option value="FL">Florida</option>
								<option value="GA">Georgia</option>
								<option value="HI">Hawaii</option>
								<option value="ID">Idaho</option>
								<option value="IL">Illinois</option>
								<option value="IN">Indiana</option>
								<option value="IA">Iowa</option>
								<option value="KS">Kansas</option>
								<option value="KY">Kentucky</option>
								<option value="LA">Louisiana</option>
								<option value="ME">Maine</option>
								<option value="MD">Maryland</option>
								<option value="MA">Massachusetts</option>
								<option value="MI">Michigan</option>
								<option value="MN">Minnesota</option>
								<option value="MS">Mississippi</option>
								<option value="MO">Missouri</option>
								<option value="MT">Montana</option>
								<option value="NE">Nebraska</option>
								<option value="NV">Nevada</option>
								<option value="NH">New Hampshire</option>
								<option value="NJ">New Jersey</option>
								<option value="NM">New Mexico</option>
								<option value="NY">New York</option>
								<option value="NC">North Carolina</option>
								<option value="ND">North Dakota</option>
								<option value="OH">Ohio</option>
								<option value="OK">Oklahoma</option>
								<option value="OR">Oregon</option>
								<option value="PA">Pennsylvania</option>
								<option value="RI">Rhode Island</option>
								<option value="SC">South Carolina</option>
								<option value="SD">South Dakota</option>
								<option value="TN">Tennessee</option>
								<option value="TX">Texas</option>
								<option value="UT">Utah</option>
								<option value="VT">Vermont</option>
								<option value="VA">Virginia</option>
								<option value="WA">Washington</option>
								<option value="WV">West Virginia</option>
								<option value="WI">Wisconsin</option>
								<option value="WY">Wyoming</option>
							</select> */}
							<input id="state" className="validate" type="text"
								maxLength="2"
								name = "state"
								label='State'
								onChange={this._handleChange}
								required
							/>
							<label htmlFor="state">State</label>
						</div>
						<div className="input-field col s2">
							<input id="zip" className="validate" type="text"
								maxLength="5"
								name = "zipCode"
								label='Zip'
								onChange={this._handleChange}
								required
							/>
							<label htmlFor="zip">Zip Code</label>
						</div>
						<div className="col s3"/>
					</div>
					<div className="row">
						<div className="col s5"/>
						<button className="col s2 waves-effect waves-light btn submitOrder"
							type="submit"
							onSubmit={this._handleSubmit}
						>
							Submit Order
						</button>
						<div className="col s5"/>
						<div className="row">
							<h2 className="col s12 center order-message">
								{ message }
							</h2>
						</div>
					</div>
				</form>

			);
		}
	}
}

function mapStateToProps(state, props) {
	return {
		error: state.checkout.error,
		orderSuccess: state.checkout.orderSuccess,
		orderFailure: state.checkout.orderFailure,
		cart: state.cart.cart,
		cartTotal: state.cart.cartTotal,

	};
}

export default connect(mapStateToProps, { submitOrder }) (Checkout);

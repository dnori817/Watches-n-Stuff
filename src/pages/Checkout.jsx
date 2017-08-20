import "./Checkout.scss";
import React, { Component } from "react";
import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";

class Checkout extends Component {
	render() {
		return (
			<form>
				<div className="row">
					<div className="col s12"/>
				</div>
				<div className="row">
					<div className="col s3"/>
					<div className="input-field col s3">
						<input className="first_name" type="text" placeholder="First Name"/>
					</div>
					<div className="input-field col s3">
						<input className="last_name" type="text" placeholder="Last Name"/>
					</div>
					<div className="col s3"/>
				</div>
				<div className="row">
					<div className="col s3"/>
					<div className="input-field col s6">
						<input className="street" type="text" placeholder="Street Address"/>
					</div>
					<div className="col s3"/>
				</div>
				<div className="row">
					<div className="col s3"/>
					<div className="col s2">
						<input className="city" type="text" placeholder="City/Town"/>
					</div>
					<div className="col s2">
						<input className="state" type="text" placeholder="State"/>
						{/* <select value="">
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
					</div>
					<div className="col s2">
						<input className="zip" type="text" placeholder="Zip Code"/>
					</div>
					<div className="col s3"/>
				</div>
				<div className="row">
					<div className="col s5"/>
					<Link to={"/Success"}>
						<a className="col s2 waves-effect waves-light btn submitOrder">
							Submit Order
						</a>
					</Link>
					<div className="col s5"/>
				</div>

			</form>

		);
	}
}

export default Checkout;

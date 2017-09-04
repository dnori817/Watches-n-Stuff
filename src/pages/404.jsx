import "./404.scss";
import React, { Component } from "react";
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
					<div className="col s10 center"/>
					<div className="col s1"/>
				</div>
			</div>
		);
	}
}

export default FourOhFour;

import "./All.scss";
import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";
import { getAllProducts } from "actions/products";
import { connect } from "react-redux";

class All extends Component {
	componentDidMount() {
		this.props.getAllProducts();
	}
	render() {
		const { products } = this.props;
		return (
			<div>
				<div className="All">
					{products.map((product) => {
						return (
							<div className="container">
								<Link key={product.id} to={`/Detail/${product.id}`}>
									<div className="All-prod center">
										<h3>{product.name}</h3>
										<img src={product.images[0].medium}/>

		 							</div>
								</Link>

							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		products: state.products.products,
	};
}

export default connect(mapStateToProps, { getAllProducts }) (All);

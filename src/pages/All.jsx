import "./All.scss";
import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";
import { getAllProducts } from "actions/products";
import Loader from "components/Loader.jsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class All extends Component {
	componentDidMount() {
		this.props.getAllProducts();
	}
	render() {
		const { products, isLoading, error } = this.props;
		// console.log(products);
		let content;

		if (isLoading) {
			content = <Loader/>;
		}
		else if (!products) {
			content = <div className="">{ error }</div>;
		}
		else { content = (
			<div>
				<div className="All">
					{products.map((product) => {
						return (
							<div className="container">
								<Link key={product.id} to={`/Detail/${product.id}`}>
									<div className="All-prod center">
										<h3>{product.name}</h3>
										<img src={product.image.medium}/>

		 							</div>
								</Link>

							</div>
						);
					})}
				</div>
			</div>
		);
		}
		return (
			<div className="All">
				{ content }
			</div>
		);
	}
}

All.propTypes = {
	products: PropTypes.arrayOf
	(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		price: PropTypes.string,
		rating: PropTypes.number,
		image: PropTypes.shape({
			small: PropTypes.string,
			medium : PropTypes.string,
			large : PropTypes.string,
			original : PropTypes.string,
		}),
	})).isRequired,
	isLoading: PropTypes.bool,
	error: PropTypes.string,
	// Actions
	getAllProducts: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
	return {
		products: state.products.products,
		isLoading: state.products.isLoading,
		error: state.products.error,
	};
}

export default connect(mapStateToProps, { getAllProducts }) (All);

import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
import { Link } from "react-router-dom";
import { connect } from "redux-thunk";


class Home extends Component {
	render() {
		return (
			<div>
				<div className="Home">
					<h1>Welcome!</h1>
					{/* {PRODUCTS.map((product) => {
						return (
							<div>
								<Link to={"./All"}>
									<img src={product.images[0].small}/>
									<img src={product.images[1].large}/>
									<img src={product.images[2].small}/>
									<img src={product.images[0].medium}/>
									<img src={product.images[2].large}/>
									<img src={product.images[1].small}/>
									<img src={product.images[1].medium}/>
									<img src={product.images[2].medium}/>
									<img src={product.images[0].large}/>
								</Link>
							</div>
						);
					})} */}
				</div>
				{/* <pre>{JSON.stringify(PRODUCTS, null, 2)}</pre> */}
			</div>
		);
	}
}

export default Home;

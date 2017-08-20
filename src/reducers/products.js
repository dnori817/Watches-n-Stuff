const INITIAL_STATE = {
	products: [],
};

function productsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "GET_PRODUCTS":
		return {
			...state,
			products: action.products,
		};
	default:
		return state;
	}
}

export default productsReducer;

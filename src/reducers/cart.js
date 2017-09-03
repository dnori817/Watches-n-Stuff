const INITIAL_STATE = {
	cart: [],
	cartTotal: 0,
};

function cartReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "ADD_TO_CART":
		return {
			cart: [...state.cart,
				action.product,
			],
			cartTotal: state.cartTotal + 1,
		};
	case "ADD_FAILED":
		return {
			...state,
			error: action.error,
		};
	default:
		return state;
	}
}

export default cartReducer;

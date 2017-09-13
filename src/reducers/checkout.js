const INITIAL_STATE = {
	order: {},
	orderSuccess: false,
	orderFailure: false,
	error: null,

};

function checkoutReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "SUBMIT_ORDER_SUCCESS":
		return {
			...state,
			order: action.order,
			orderSuccess: true,
			orderFailure: false,
		};
	// Error Cases
	case "SUBMIT_ORDER_FAILURE":
		return {
			...state,
			error: action.error,
			orderSuccess: false,
			orderFailure: true,
		};

	default:
		return state;
	}
}


export default checkoutReducer;

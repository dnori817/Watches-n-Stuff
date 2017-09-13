import API from "util/api";

export function submitOrder(order, cartItemIds) {
	return (dispatch, getStore) => {
		const { cart } = getStore().cart;
		const productIds  =	cart.map(function(item) {
			return item.id;
		});
		dispatch({
			type: "SUBMIT_ORDER_START",
		});
		console.log("submitOrder(order, cart)", order.zipCode, productIds);
		API.post('/orders', {
			args: {
				name: order.name,
				address: order.address,
				city: order.city,
				state: order.state,
				zipcode: order.zipCode,
				products: productIds,
			},
		})
			.then((res) => {
				if (res.data) {
					console.log("submitOrder(success)",res);
					dispatch({
						type: "SUBMIT_ORDER_SUCCESS",
						data: res.data,
						order,
					});
				}
				else {
					console.log("submitOrder(error)",res);

					dispatch({
						type: "SUBMIT_ORDER_FAILURE",
						error: res.error.message,
					});
				}
			})
			.catch((error) => {
				dispatch({
					type: "SUBMIT_ORDER_FAILURE",
					error: "Something went wrong, please refresh",
				});
			});
	};
}

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		orderItems: [
			{
				// this is an array of objects
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				// this is a reference to the Product model
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				price: { type: Number, required: true },
			},
		],
		shippingAddress: {
			// this is an object
			//fullName: { type: String, required: true },
			address: { type: String, required: true },
			// these are strings, not numbers, because they can have dashes
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			// these are strings, not numbers, because they can have dashes
			country: { type: String, required: true },
			// this is a string, not a number, because it can have dashes
			lat: Number,
			// this is a string, not a number, because it can have dashes
			lng: Number,
		},
		paymentMethod: { type: String, required: true },
		// this is an object
		paymentResult: {
			// these are strings, not numbers, because they can have dashes
			id: String,
			// these are strings, not numbers, because they can have dashes
			status: String,
			// these are strings, not numbers, because they can have dashes
			update_time: String,
			// these are strings, not numbers, because they can have dashes
			email_address: String,
		},
		itemsPrice: { type: Number, required: true, default: 0.0 },
		// this is a number, not a string, because it can't have dashes
		taxPrice: { type: Number, required: true, default: 0.0 },
		// this is a number, not a string, because it can't have dashes
		shippingPrice: { type: Number, required: true, default: 0.0 },
		// this is a number, not a string, because it can't have dashes
		totalPrice: { type: Number, required: true, default: 0.0 },
		// this is a boolean, not a string, because it can't have dashes
		isPaid: { type: Boolean, required: true, default: false },
		// this is a date, not a string, because it can't have dashes
		paidAt: { type: Date },
		// this is a boolean, not a string, because it can't have dashes
		isDelivered: { type: Boolean, required: true, default: false },
		// this is a date, not a string, because it can't have dashes
		deliveredAt: { type: Date },
	},
	{
		timestamps: true, // this will create createdAt and updatedAt fields
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		products: [
			{
				title: {
                    type: String,
                    required: true,
                },
                qty: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
				total: {
					type: Number,
					required: true,
					min: 0
				}
			}
		],
		priceTotal: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		}
	},
	{
		timestamps: true,
	},
);

const cartSchema = mongoose.model("Cart", schema);

export default cartSchema;
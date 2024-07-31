import { Schema, model } from 'mongoose'

const OrderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    items: [
        {
            id: {
                type: Number,
                required: true
            },
            brand: {
                type: String,
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
})

const Order = model('Order', OrderSchema)

export default Order

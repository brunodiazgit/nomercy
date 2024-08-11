import Order from '../models/orderModel.js'

export const createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, items, totalAmount } = req.body

        const newOrder = new Order({
            customerName,
            email,
            phone,
            items,
            totalAmount
        })

        const savedOrder = await newOrder.save();
        return res.status(200).json({
            status: "success",
            order: savedOrder,
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: 'Error creating order',
            error: error.message
        })
    }
}

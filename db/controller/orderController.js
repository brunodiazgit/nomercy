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

export const findOrders = async (req, res) => {
    const {email} = req.params

    try {
        let orders = await Order.find({ email }).select({customerName:0, email: 0, phone: 0})
        if(orders.length === 0){
            return res.status(200).json({
                status: "success",
                message: "you have not made any orders",
                orders: []
            })
        }
        return res.status(200).json({
            status: "success",
            orders: orders
        })

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "server error",
            error: error.message
        })
    }

}

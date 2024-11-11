//HOW TO CREATE AN ORDER

export const createOrder = async (req, res, pool) => {
    const customer_id = req.user.id
    try {
        // Obtener productos del carrito junto con sus precios desde la tabla PRODUCTS
        const query = `
            SELECT CART.product_id, CART.quantity, PRODUCTS.price
            FROM CART
            JOIN PRODUCTS ON CART.product_id = PRODUCTS.id
            WHERE CART.customer_id = $1
        `
        const cartItems = await pool.query(query, [customer_id])

        if (cartItems.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "The cart is empty."
            })
        }

        // Calcular el total de la orden
        const total = cartItems.rows.reduce((acc, item) => acc + item.price * item.quantity, 0)

        // Crear la orden en la tabla ORDERS
        const order = `INSERT INTO ORDERS (customer_id, order_date, total)
                       VALUES ($1, NOW(), $2) RETURNING *`
        const newOrder = await pool.query(order, [customer_id, total])

        // Insertar detalles de la orden en ORDERDETAILS
        const orderId = newOrder.rows[0].id
        for (const item of cartItems.rows) {
            await pool.query(
                "INSERT INTO ORDERDETAILS (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
                [orderId, item.product_id, item.quantity, item.price]
            )
        }

        // Vaciar el carrito del usuario
        const cart = `DELETE FROM CART WHERE customer_id = $1`
        await pool.query(cart, [customer_id])

        return res.status(200).json({
            status: "success",
            message: "Order has been successfully created!",
            order: newOrder.rows[0]
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}

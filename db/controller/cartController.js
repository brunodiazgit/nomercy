// HOW TO ADD A PRODUCT TO CART


export const addToCart = async (req, res, pool) => {
    const { product_id, quantity } = req.body
    const customer_id = req.user.id
    try {
        if (!product_id || !quantity) {
            return res.status(400).json({
                status: "error",
                message: "you must fill in all of the fields"
            })
        }

        const existingItem = `SELECT * FROM CART WHERE customer_id = $1 AND product_id = $2`

        const result = await pool.query(existingItem, [customer_id, product_id])

        if (result.rows.length > 0) {
            const updatedItem = `UPDATE CART SET quantity = quantity + $1 WHERE customer_id = $2 AND product_id = $3 RETURNING *`

            const updatedChanges = await pool.query(updatedItem, [quantity, customer_id, product_id])
            res.json(updatedChanges.rows[0])
        } else {
            const newItem = `INSERT INTO CART(customer_id, product_id, quantity)
                            VALUES($1, $2, $3) RETURNING *`

            const addItem = await pool.query(newItem, [customer_id, product_id, quantity])
            res.json(addItem.rows[0])
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}

// HOW TO GET ALL THE PRODUCTS INTO THE CART 

export const getCart = async (req, res, pool) => {
    const customer_id = req.user.id

    try {
        // Retrieve cart items along with their prices
        const cartQuery = `
            SELECT CART.product_id, CART.quantity, PRODUCTS.price, PRODUCTS.image_link, PRODUCTS.name, (CART.quantity * PRODUCTS.price) AS item_total
            FROM CART
            JOIN PRODUCTS ON CART.product_id = PRODUCTS.id
            WHERE CART.customer_id = $1
        `
        const result = await pool.query(cartQuery, [customer_id])

        if (result.rows.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "The cart is empty.",
                cart: [],
                total: 0
            })
        }

        // Calculate the total of all items in the cart
        const total = result.rows.reduce((acc, item) => acc + Number(item.item_total), 0)
        

        return res.status(200).json({
            status: "success",
            cart: result.rows,
            total: parseFloat(total).toFixed(2)
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}

// HOW TO DELETE A PRODUCT FROM THE CART

export const deleteCartProduct = async (req, res, pool) => {
    const { product_id } = req.body
    const customer_id = req.user.id

    try {

        const query = `DELETE FROM CART WHERE customer_id = $1 AND product_id = $2`
        const result = await pool.query(query, [customer_id, product_id])


        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "product not found in the cart"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Product has been successfully deleted."
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}


// HOW TO MODIFY THE PRODUCT'S QUANTITY

export const editQuantity = async (req, res, pool) => {
    const { product_id, quantity } = req.body
    const customer_id = req.user.id

    try {
        const query = `UPDATE CART SET quantity = $1 WHERE customer_id = $2 AND product_id = $3 RETURNING *`

        const result = await pool.query(query, [quantity, customer_id, product_id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found in the cart."
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Quantity has been successfully changed",
            updatedPoruct: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}


// CART'S QUANTITY

export const cartQuantity = async(req, res, pool)=>{
    const customer_id = req.user.id


    try {
        const query = `SELECT SUM(quantity) AS cartquantity FROM CART WHERE customer_id = $1`
        
        const result = await pool.query(query, [customer_id])

        const cartquantity = result.rows[0].cartquantity || 0

        return res.status(200).json({
            status: "success",
            cartQuantity: cartquantity
        })
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }

}

import multer from "multer"
import path from "path"
import fs from "fs"

// HOW TO GET ALL PRODUCTS

export const getProducts = async (req, res, pool) => {

    try {
        const query = `SELECT * FROM PRODUCTS`
        const result = await pool.query(query)

        return res.status(200).json({
            status: "success",
            products: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        })
    }
}

// HOW TO GET A PRODUCT BY CATEGORY 

export const getProductByCategory = async (req, res, pool) => {
    const { category } = req.params

    try {
        const query = `SELECT * FROM PRODUCTS WHERE product_type = $1`
        const result = await pool.query(query, [category])

        if (!result || result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No products found for this category"
            })
        }

        return res.status(200).json({
            status: "success",
            products: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        })
    }
}

//HOW TO GET A PRODUCT BY ID

export const getProductById = async (req, res, pool) => {
    const { id } = req.params

    try {
        const query = `SELECT * FROM PRODUCTS WHERE id = $1`
        const result = await pool.query(query, [id])

        if (!result || result.rows.length <= 0) {
            return res.status(404).json({
                status: "error",
                message: "The item doesn't exist"
            })
        }

        return res.status(200).json({
            status: "success",
            product: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        })
    }
}

// Multer configuration

const uploadDirectory = 'uploads'

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true }) 
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)) 
    }
})

export const upload = multer({ storage: storage })


// HOW TO CREATE A PRODUCT

export const createProduct = async (req, res, pool) => {
    const { name, brand, price, description, product_type } = req.body

    if (!req.file) {
        return res.status(400).json({
            status: "error",
            message: "You must upload an image."
        })
    }

    const image_link = '/uploads/' + req.file.filename  

    try {
        if (!name || !brand || !price || !description || !product_type) {
            return res.status(400).json({
                status: "error",
                message: "you must fill in all the fields."
            })
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Price must be a positive number."
            })
        }

        const query = `INSERT INTO PRODUCTS(name, brand, price, image_link, description, product_type)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`

        const newProduct = await pool.query(query, [name, brand, price, image_link, description, product_type])

        return res.status(201).json({
            status: "success",
            message: "You have added a new product",
            product: newProduct.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}

// HOW TO MODIFY A PRODUCT

export const editProduct = async (req, res, pool) => {
    const { id } = req.params
    const { name, brand, price, image_link, description, product_type } = req.body

    try {

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "the id is required."
            })
        }

        const query = `UPDATE PRODUCTS 
                    SET 
                        name = COALESCE($1, name),
                        brand = COALESCE($2, brand),
                        price = COALESCE($3, price),
                        image_link = COALESCE($4, image_link),
                        description = COALESCE($5, description),
                        product_type = COALESCE($6, product_type)
                        WHERE id = $7 
                        RETURNING *`

        const result = await pool.query(query, [name, brand, price, image_link, description, product_type, id])   
        
        if(!result.rowCount === 0){
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully.",
            product: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}

// HOW TO DELETE A PRODUCT

export const deleteProduct = async(req, res, pool)=>{
    const { id } = req.params

    try{
        if(!id){
            return res.status(400).json({
                status: "error",
                message: "the id is required."
            })
        }

        const query = `DELETE FROM PRODUCTS WHERE id = $1`

        const deletedProduct = await pool.query(query, [id])

        if(deletedProduct.rowCount === 0){
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "You have successfully deleted a product",
            product: deletedProduct.rows[0]
        })

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "server internal error",
            error: error.message
        })
    }
}
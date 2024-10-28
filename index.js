import express from "express"
import cors from "cors"
import pkg from "pg"
import  userRoutes  from "./db/routes/userRoutes.js"


console.log("Starting Node app.")

const app = express()

const port = 4100

app.use(cors())

app.use(express.json())

// DATABASE 

const { Pool } = pkg
    
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'NoMercy',
    password: 'Santana1!',
    port: 5432,
})

//ROUTES 

//app.use('/api/orders', orderRoutes)
app.use('/api/user', userRoutes(pool))

const migrateData = async () => {
    try {
        // Reemplaza con la URL de tu API
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
        
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }

        const products = await response.json();

        for (const product of products) {
            const {
                brand,
                name,
                price,
                image_link,
                description,
                category,
                product_type,
            } = product;

            // Inserción en la base de datos
            const query = `
                INSERT INTO products (brand, name, price, image_link, description, category, product_type, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            `;
            await pool.query(query, [brand, name, price, image_link, description, category, product_type]);
        }

        console.log('Datos migrados con éxito');
    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await pool.end();
    }
};

// Llama a la función de migración
migrateData();


app.listen(port, () => {
    console.log("The server is running on port: " + port)
})
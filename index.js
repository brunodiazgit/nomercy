import express from "express";
import cors from "cors";
import { connection } from "./db/connection.js";
import orderRoutes from './db/routes/orderRoutes.js';

console.log("App de node inicializada");

connection();

const app = express();

const port = 3900;

app.use(cors());

app.use(express.json());

app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: " + port);
})
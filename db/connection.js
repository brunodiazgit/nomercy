import mongoose from "mongoose"

export const connection = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nomercy")

        console.log("Conectado correctamente a la base de datos nomercy")
    } catch (e) {
        console.log("error: " + e);
        throw new Error("No se ha podido conectar a la base de datos")
    }
}


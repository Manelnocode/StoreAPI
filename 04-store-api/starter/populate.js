require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

// proces es una variable global y nos da acceso a exit que sirve para cerrar el proceso una vez sea exitoso o de un error. En este caso combiene usarlo ya que solo queremos pasar los datos una vez y despues terminar la ejecucion.

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.create(jsonProducts)
        console.log('succes', result);
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()
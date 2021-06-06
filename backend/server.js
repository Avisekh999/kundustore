import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddlewares.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID)
)


app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000
 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in  port ${PORT}`.yellow.bold))
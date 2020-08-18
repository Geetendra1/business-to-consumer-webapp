import express from "express"  
import data from './data'
import dotenv from 'dotenv'
import config from './config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
const cookieParser = require('cookie-parser')


dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error => console.log(error.reason))

const app = express() 
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/users", userRoute)
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get("/api/config/paypal", (req,res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})
// app.get("/api/products/:id" , (req,res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product)
//         res.send(product)
//     else
//         res.status(404).send({msg: "Product not found"})
// })
// app.get("/api/products" , (req,res) => {
//     res.send(data.products)
// })

app.listen(5000, () => { console.log("server is running at port http://localhost:5000");})
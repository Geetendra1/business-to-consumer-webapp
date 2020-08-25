export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://Geetendra:darksider@cluster0-k14x6.mongodb.net/amazona?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID || 'sb',
    CLIENT_ORIGIN : 'http://localhost:3000'
}
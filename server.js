require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.static('public')); // Serves your HTML file
app.use(express.json());

// Initialize Razorpay
// NOTE: We will put your Test Keys here in Step 4
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_TEST_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_TEST_SECRET'
});

// Endpoint to create a Razorpay Order
app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: 9900, // Amount is in PAISE (₹99.00 = 9900 paise)
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };
        
        const order = await razorpay.orders.create(options);
        res.json(order); // Send the order details to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Change PORT to dynamically accept cloud hosting ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
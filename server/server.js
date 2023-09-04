if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '../.env'});
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY,
      stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const app = express();
const fs = require('fs'),
      path = require('path'),
      cors = require('cors'),
      stripe = require('stripe')(stripeSecretKey);
      bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const dataPathForStoreItems = path.join(__dirname, 'data', 'storeItems.json')
      

 app.get('/items', (req, res) => {
    fs.readFile(dataPathForStoreItems, (err, data) => {
        if(err) {
            console.log('ERROR',  err)
            res.status(500).end();
        } else {
            const items = JSON.parse(data);
            res.json(items);
        }
    });
});


//PAYMENT SYSTEM
app.post('/create-checkout-session', async (req, res) => {
    try {
        console.log(req.body.items)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map((item) => {
                if (typeof item === 'object'){
                    return {
                        price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price
                        },
                        quantity: item.quantity
                    }
                }
            }),
            success_url: `${process.env.PUBLIC_URL}`,
            cancel_url: `${process.env.PUBLIC_URL}`,
        })
        res.json({ url: session.url});
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

//AUTHENTIFICATION

const users = [
    { name: 'nigga', color: 'black'}
];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userName = req.body.name;
        const userEmail = req.body.email;
        const user = {"name": userName, "email": userEmail, "password": hashedPassword}
        users.push(user);
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
    
})


app.listen(3000);

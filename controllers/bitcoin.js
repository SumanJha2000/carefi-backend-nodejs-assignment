const Bitcoin = require('../models/bitcoin.js');
const fetch = require('node-fetch')

const bitcoin = {
    price: async (req, res) => {
        try {
            const result = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD')
            const data = await result.json();
            const price = data.bitcoin.usd;
            const saveData = await Bitcoin.create({ price: price });
            res.status(200).json({
                message: 'price saved successfully',
                price: price
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getDetails: async (req, res) => {

        try {
            const id = req.params.id;
            const data = await Bitcoin.find().skip(0).limit(10);
            res.status(200).json({ data: data });
        } catch (err) {
            res.send(400).json({ err: err });
        }
    }
}

module.exports = bitcoin;
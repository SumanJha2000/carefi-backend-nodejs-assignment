const mongoose = require('mongoose');
const BitcoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Bitcoin'
    },

    price: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Bitcoin = new mongoose.model('btc', BitcoinSchema);
module.exports = Bitcoin;
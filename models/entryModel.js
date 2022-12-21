const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    coin: {
        type: String,
        required: [true, 'Please select a coin'],
        unique: ['Bitcoin (BTC)', 'Etherium (ETH)', 'BNB (BNB)', 'Dogecoin (DOGE)', 'Cardano (ADA)', 'Polygon (MATIC)'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount'],
    },
    status: {
        type: String,
        required: true,
        enum: ['buy', 'sell'],
        default: 'buy',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema);
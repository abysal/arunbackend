const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})
const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking 
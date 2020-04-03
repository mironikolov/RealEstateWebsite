const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
    id: { type: String },
    title:{ type: String, require:true },
    address:{ type: String, require: true },
    price: { type: String, require: true },
    rooms: { type: Number, required: true },
    area: { type: Number, required: true },
    type: { type: String, required: true },
    tags: [{ type: String }],
    extraInfo: { type: String },
    date: { type: Date, required: true},
    publisher: { type:String, required: true},
    picturesNames: { type: [String] },
    picturesURL: { type: [String] }
});

module.exports = mongoose.model( 'Property', propertySchema );
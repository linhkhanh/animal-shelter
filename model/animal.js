const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: String,
    species: String,
    breed: String,
    sex: String,
    image: String,
    age: Number,
    adopted: Boolean
})

const Todos = mongoose.model('Animal', todoSchema);

module.exports = Todos;

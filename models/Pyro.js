const { Schema, model } = require('mongoose');

const Pyro = Schema({
    score: {
        type: number,
        default: 0
    },
    user: String
});

module.exports = model("Pyro", Pyro);
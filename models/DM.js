const { Schema, model } = require('mongoose');

const DM = Schema({
    userMessage: String,
    user: String
});

module.exports = model("DM", DM);
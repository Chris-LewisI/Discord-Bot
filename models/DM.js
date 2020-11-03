const { Schema, model } = require('mongoose');

const DM = Schema({
    msg: String,
    user: String
});

module.exports = model("DM", DM);
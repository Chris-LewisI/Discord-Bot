const { Schema, model } = require('mongoose');

const Guild = Schema({
    msg_id: String,
    character: {
        default: '?',
        type: String,
    }
});

module.exports = model("Guild", Guild);
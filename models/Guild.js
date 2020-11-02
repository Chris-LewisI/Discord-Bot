const { Schema, model } = require('mongoose');

const Guild = Schmea({
    id: String,
    prefix: {
        default: '?',
        type: String,
    }
});

module.exports = model("Guild", Guild);
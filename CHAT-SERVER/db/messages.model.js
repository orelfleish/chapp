const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
});
messageSchema.index({createdAt: 1 });

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;
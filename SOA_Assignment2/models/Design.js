const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
    uiType: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    theme: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Design || mongoose.model('Design', DesignSchema);

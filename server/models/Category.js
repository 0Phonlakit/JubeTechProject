const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true, maxlength: 100 }
}, { timestamps: true });

module.exports = mongoose.model("Categories", CategorySchema);
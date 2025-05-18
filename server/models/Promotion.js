const mongoose = require("mongoose");
const { Schema } = mongoose;

const PromotionSchema = new Schema ({
    name: { type: String, required: true, unique: true, maxlength: 100 },
    for_course: { type: String, enum: ["all", "specific"], required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref:"Course" }],
    code: { type: String, required: true, unique: true, maxlength: 15 },
    status: { type: Boolean, required: true }, 
    type: { type: String, enum: ["amount", "percent"], required: true }, 
    discount: { type: Number, required: true, max: 2000 },
    min_purchase_amount: { type: Number, required: true },
    max_discount: { type: Number, required: true },
    condition_type: { type: String, enum: ["Once", "Unlimited", "LimitPerDay"], required: true },
    quantity_per_day: { type: Number }, 
    quantity: { type: Number, required: true },
    remark: { type: String },
    start_date: { type: Date, required: true }, 
    end_date: { type: Date, required: true }, 
    times: [{
        start_time: { type: Date },
        end_time: { type: Date }
    }] 
    }, { 
        timestamps: true 
    }
);

const Promotion = mongoose.model('Promotions', PromotionSchema);
module.exports = Promotion;

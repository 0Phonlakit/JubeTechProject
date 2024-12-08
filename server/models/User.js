const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseSequence = require('mongoose-sequence')(mongoose); 

const userSchema = new Schema(
  {
    _id: { type: Number }, 
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, 
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please fill a valid email address'] },
    emailverifiedat: { type: Date },
    password: { type: String, required: true },
    role: [{ type: String, ref: 'Role' }]
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseSequence, { inc_field: '_id' });

const User = mongoose.model('User', userSchema);
module.exports = User;

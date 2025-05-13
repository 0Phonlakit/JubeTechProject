const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'pending'],
    default: 'pending'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

// สร้าง index เพื่อให้การค้นหาเร็วขึ้น
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ paymentId: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);

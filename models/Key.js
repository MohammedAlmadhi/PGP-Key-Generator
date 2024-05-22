const mongoose = require('mongoose');
const { Schema } = mongoose;

const keySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  algorithm: {
    type: String,
    enum: ['rsa', 'ecc'],
    required: true
  },
  keySize: {
    type: Number,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  passphrase: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updatedAt` on document update
keySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Key = mongoose.model('PGP-Key', keySchema);

module.exports = Key;

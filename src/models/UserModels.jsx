import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
    trim: true,
    minlength: 6,
    select: false,
  },
  historyProduct: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  wishlistProduct: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModels = mongoose.models.Users || mongoose.model('users', UserSchema);

export default UserModels;

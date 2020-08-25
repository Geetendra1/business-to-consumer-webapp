import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  confirmed: { type: Boolean, default: false },
  passwordResetExpires: { type: Date, default: Date("2018/06/06") },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
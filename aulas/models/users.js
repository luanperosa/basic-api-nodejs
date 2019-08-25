const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function (next) {
  let user = this;
  if(!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
  
  // bcrypt.hash(user.password, 10, (err, encrypted) => {
  //   user.password = encrypted;
  //   return next();
  // });
});

module.exports = mongoose.model('User', UserSchema);
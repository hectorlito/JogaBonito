const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true ,required: true },
  avatar: { type: String, default: "https://i.imgur.com/fGi0Yl0.png" },
  password: { type: String, required: true},
  favPlayer: { type: String, default: "Who is your favorite player?" }

});

userSchema.pre('save', function(next) {
   if (this.isModified('password')) {
      const hashedPass = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      this.password = hashedPass;
   }
   next();
});

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);

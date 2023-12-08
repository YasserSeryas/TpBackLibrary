// models/user.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    
  },
  password: {
    type: String,
    required: true,
    select: false,
},
  role: {
    type: String,
    lowercase: true,
    enum: ["user", "librarian"],  
    default: "user",
    required: true,
  },
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  managedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const User = model('User', userSchema);

export default User;

// models/librarian.js
import { Schema, model } from 'mongoose';

const librarianSchema = new Schema({
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
  managedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const Librarian = model('Librarian', librarianSchema);

export default Librarian;

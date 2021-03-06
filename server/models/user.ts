import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserDocument extends mongoose.Document {
    id?: string;
    _id?: string;
    __v?: number;
    username: string;
    passwordHash?: string;
    email: string;
    events?: Array<string>,
    comments?: Array<string>;
}

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
  ],  
});
    
schema.set('toJSON', {
  transform: (_document: unknown, returnedObject: IUserDocument) => {
    if(returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});
    
schema.plugin(uniqueValidator);
    
const User = mongoose.model<IUserDocument>('User', schema);
    
export default User;
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserDocument extends mongoose.Document {
    id?: string;
    _id?: string;
    __v?: number;
    username: string;
    passwordHash?: string;
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
      }
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
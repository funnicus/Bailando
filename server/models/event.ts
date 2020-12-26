import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IEventDocument extends mongoose.Document {
    id?: string;
    _id?: string;
    __v?: number;
    name: string;
    summary: string;
    description: string;
    comments?: Array<string>;
    votes: number;
    user: string;
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
      },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],  
    votes: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
});
    
schema.set('toJSON', {
  transform: (_document: unknown, returnedObject: IEventDocument) => {
    if(returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
    
schema.plugin(uniqueValidator);
    
const Event = mongoose.model<IEventDocument>('Event', schema);
    
export default Event;
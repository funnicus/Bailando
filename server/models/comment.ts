import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface ICommentDocument extends mongoose.Document {
    id?: string;
    _id?: string;
    __v?: number;
    user: string;
    event: string;
    content: string;
    votes: number;
    date: Date;
}

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
    
schema.set('toJSON', {
  transform: (_document: unknown, returnedObject: ICommentDocument) => {
    if(returnedObject._id) returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
    
schema.plugin(uniqueValidator);
    
const Comment = mongoose.model<ICommentDocument>('Comment', schema);
    
export default Comment;
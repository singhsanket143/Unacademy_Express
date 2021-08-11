import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        minlength: 10
    },
    status: {
        type: String,
        enum: ['draft', 'under review', 'published'],
        default: 'draft'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

export const Post = mongoose.model('post', postSchema);
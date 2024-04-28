import mongoose, { Document, Schema } from "mongoose";

export interface Comment extends Document {
    blog_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    content: string;
};

const commentSchema: Schema<Comment> = new Schema(
    {
        blog_id: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: [true, "Content is required"]
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.models.Comment as mongoose.Model<Comment> || mongoose.model<Comment>("Comment", commentSchema);

export default Comment;
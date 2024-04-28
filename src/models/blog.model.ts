import mongoose, { Document, Schema } from "mongoose";

export interface Blog extends Document {
    title: string;
    content: string;
    author_id: Schema.Types.ObjectId;
};

const blogSchema: Schema<Blog> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        content: {
            type: String,
            required: [true, "Content is required"]
        },
        author_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.models.Blog as mongoose.Model<Blog> || mongoose.model<Blog>("Blog", blogSchema);

export default Blog;
import mongoose, { Document, Schema } from "mongoose";

export interface Like extends Document {
    blog_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
};

const likeSchema: Schema<Like> = new Schema(
    {
        blog_id: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
);

const Like = mongoose.models.Like as mongoose.Model<Like> || mongoose.model<Like>("Like", likeSchema);

export default Like;
import mongoose, { Document, Schema } from "mongoose";

export interface Follower extends Document {
    follower_id: Schema.Types.ObjectId;
    followed_id: Schema.Types.ObjectId;
};

const followerSchema: Schema<Follower> = new Schema(
    {
        follower_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        followed_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
);

const Follower = mongoose.models.Follower as mongoose.Model<Follower> || mongoose.model<Follower>("Follower", followerSchema);

export default Follower;
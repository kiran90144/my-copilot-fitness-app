import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  date: Date;
  caloriesBurned: number;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  caloriesBurned: { type: Number, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);

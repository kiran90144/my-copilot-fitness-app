import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain', fitnessGoal: 'Run a half marathon' },
      { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'member', fitnessGoal: 'Build strength' },
      { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'member', fitnessGoal: 'Improve mobility' },
    ]);

    await Team.insertMany([
      { name: 'Velocity Squad', sport: 'Running', members: [users[0].name, users[1].name] },
      { name: 'Power House', sport: 'CrossFit', members: [users[2].name] },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 45, caloriesBurned: 520, date: new Date('2026-07-01') },
      { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 60, caloriesBurned: 410, date: new Date('2026-07-02') },
      { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 35, caloriesBurned: 180, date: new Date('2026-07-03') },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), userName: users[0].name, score: 980, rank: 1 },
      { userId: users[1]._id.toString(), userName: users[1].name, score: 875, rank: 2 },
      { userId: users[2]._id.toString(), userName: users[2].name, score: 810, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'Tempo Run', focus: 'Cardio', durationMinutes: 30, difficulty: 'Intermediate' },
      { name: 'Upper Body Blast', focus: 'Strength', durationMinutes: 25, difficulty: 'Beginner' },
      { name: 'Mobility Flow', focus: 'Recovery', durationMinutes: 20, difficulty: 'Easy' },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

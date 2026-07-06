"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await user_1.User.deleteMany({});
        await team_1.Team.deleteMany({});
        await activity_1.Activity.deleteMany({});
        await leaderboard_1.LeaderboardEntry.deleteMany({});
        await workout_1.Workout.deleteMany({});
        const users = await user_1.User.insertMany([
            { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain', fitnessGoal: 'Run a half marathon' },
            { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'member', fitnessGoal: 'Build strength' },
            { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'member', fitnessGoal: 'Improve mobility' },
        ]);
        await team_1.Team.insertMany([
            { name: 'Velocity Squad', sport: 'Running', members: [users[0].name, users[1].name] },
            { name: 'Power House', sport: 'CrossFit', members: [users[2].name] },
        ]);
        await activity_1.Activity.insertMany([
            { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 45, caloriesBurned: 520, date: new Date('2026-07-01') },
            { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 60, caloriesBurned: 410, date: new Date('2026-07-02') },
            { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 35, caloriesBurned: 180, date: new Date('2026-07-03') },
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), userName: users[0].name, score: 980, rank: 1 },
            { userId: users[1]._id.toString(), userName: users[1].name, score: 875, rank: 2 },
            { userId: users[2]._id.toString(), userName: users[2].name, score: 810, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            { name: 'Tempo Run', focus: 'Cardio', durationMinutes: 30, difficulty: 'Intermediate' },
            { name: 'Upper Body Blast', focus: 'Strength', durationMinutes: 25, difficulty: 'Beginner' },
            { name: 'Mobility Flow', focus: 'Recovery', durationMinutes: 20, difficulty: 'Easy' },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

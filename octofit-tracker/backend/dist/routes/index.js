"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/users', async (_req, res) => {
    const users = await user_1.User.find({});
    res.json(users);
});
router.get('/teams', async (_req, res) => {
    const teams = await team_1.Team.find({});
    res.json(teams);
});
router.get('/activities', async (_req, res) => {
    const activities = await activity_1.Activity.find({});
    res.json(activities);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).sort({ score: -1 });
    res.json(leaderboard);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await workout_1.Workout.find({});
    res.json(workouts);
});
exports.default = router;

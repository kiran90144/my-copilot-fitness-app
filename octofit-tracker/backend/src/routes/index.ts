import { Router } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

router.get('/users', async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 });
  res.json(leaderboard);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
});

export default router;

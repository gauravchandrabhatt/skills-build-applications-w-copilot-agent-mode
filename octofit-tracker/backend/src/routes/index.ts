import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();

router.use('/users', createCrudRouter(User));
router.use('/teams', createCrudRouter(Team));
router.use('/activities', createCrudRouter(Activity));
router.use('/leaderboard', createCrudRouter(Leaderboard));
router.use('/workouts', createCrudRouter(Workout));

export default router;
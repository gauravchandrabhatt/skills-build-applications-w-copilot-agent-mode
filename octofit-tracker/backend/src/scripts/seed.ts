import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Leaderboard.deleteMany({}),
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', name: 'Alex Rivera', points: 420 },
      { username: 'sam.strength', email: 'sam@example.com', name: 'Sam Lee', points: 360 },
      { username: 'jordan.active', email: 'jordan@example.com', name: 'Jordan Kim', points: 285 },
    ]);

    const teams = await Team.create([
      { name: 'Trailblazers', description: 'Steps, trails, and steady progress.', members: [users[0]._id, users[2]._id], totalPoints: 705 },
      { name: 'Power Hour', description: 'Strength and conditioning together.', members: [users[1]._id], totalPoints: 360 },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { team: teams[1]._id });
    await User.findByIdAndUpdate(users[2]._id, { team: teams[0]._id });

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 35, distanceKm: 5.2, points: 220 },
      { user: users[1]._id, type: 'strength training', durationMinutes: 45, points: 190 },
      { user: users[2]._id, type: 'walking', durationMinutes: 40, distanceKm: 3.4, points: 145 },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, username: users[0].username, points: 420, rank: 1 },
      { user: users[1]._id, username: users[1].username, points: 360, rank: 2 },
      { user: users[2]._id, username: users[2].username, points: 285, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Starter Circuit',
        description: 'A balanced introduction to bodyweight strength.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Squats', 'Wall push-ups', 'Plank'],
      },
      {
        title: 'Cardio Builder',
        description: 'A paced workout to build endurance.',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Jog', 'High knees', 'Cool-down walk'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

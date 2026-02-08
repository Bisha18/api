import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import {Profile} from './models/Profile.js';
import profileRoutes from './routes/profile.route.js';
import connectDB from './utils/db.js'

const app = express();

// Middleware
app.use(cors({  origin: "*" }));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI


// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'MERN API Playground is running!',
    timestamp: new Date().toISOString()
  });
});

// CREATE - Create a new profile
app.use('/api/profile', profileRoutes)

// READ - Get all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles',
      error: error.message
    });
  }
});


// Search profiles by skill
app.get('/api/search/skill/:skill', async (req, res) => {
  try {
    const profiles = await Profile.find({
      skills: { $regex: req.params.skill, $options: 'i' }
    });
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching profiles',
      error: error.message
    });
  }
});

// List all projects
app.get('/api/projects', async (req, res) => {
  try {
    const profiles = await Profile.find({}, 'name email projects');
    const allProjects = profiles.flatMap(profile => 
      profile.projects.map(project => ({
        ...project.toObject(),
        owner: {
          name: profile.name,
          email: profile.email,
          id: profile._id
        }
      }))
    );
    res.status(200).json({
      success: true,
      count: allProjects.length,
      data: allProjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get top skills (aggregation)
app.get('/api/top-skills', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skillCounts = await Profile.aggregate([
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]);
    res.status(200).json({
      success: true,
      data: skillCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top skills',
      error: error.message
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB()
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
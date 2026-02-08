import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  education: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    trim: true
  }],
  projects: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    links: {
      type: String,
      default: ''
    }
  }],
  work: [{
    links: {
      github: {
        type: String,
        default: ''
      },
      linkedin: {
        type: String,
        default: ''
      },
      portfolio: {
        type: String,
        default: ''
      }
    }
  }]
}, {
  timestamps: true
});

export const Profile = mongoose.model('Profile', profileSchema);

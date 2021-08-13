const express = require('express');
const router = express.Router();
// Since we're doing database stuff, you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const { User, Question, Answer } = require('../../db/models');

// Create the API route here

// GET /api/questions
router.get('', asyncHandler(async (req, res) => {
  const questions = await Question.findAll();
  res.json(questions);
}));

module.exports = router;
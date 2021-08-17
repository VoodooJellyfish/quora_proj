const express = require('express');
const router = express.Router();
// Since we're doing database stuff, you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const { User, Question, Answer } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateQuestion = [
  check('title')
    .exists({checkFalsy: true})
    .withMessage("Please provide a title for your question"),
  handleValidationErrors
]

// Create the API route here

// GET /api/questions
router.get('', asyncHandler(async (req, res) => {
  const questions = await Question.findAll();
  res.json(questions);
}));

// GET /api/questions/:questionId
router.get('/:questionId', asyncHandler(async (req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const question = await Question.findByPk(questionId)
  res.json(question);
}));

router.put('/:questionId', validateQuestion, asyncHandler(async(req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const questiontoUpdate = await Question.findByPk(questionId)
  const {
    title, 
    description} = req.body

  const question = {
    title, 
    description
  }
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
			await questionToUpdate.update(question);
      console.log("THIS IS MY QUESTION", question)
			return res.json(question)
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
  }

}))


// router.get('/new', asyncHandler(async(req, res) => {
//   let id = parseInt(req.params.id, 10)
//   const question

// }))
// router.post('', asyncHandler(async(req, res) => {

// }));

module.exports = router;
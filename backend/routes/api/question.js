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

const validateAnswer = [
  check('answer')
    .exists({checkFalsy: true})
    .withMessage("Please provide content for your answer"),
  handleValidationErrors
]

// Create the API route here

// GET /api/questions
router.get('', asyncHandler(async (req, res) => {
  const questions = await Question.findAll({
    include: User
  });
  res.json(questions);
}));

// GET /api/questions/:questionId
router.get('/:questionId', asyncHandler(async (req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const question = await Question.findByPk(questionId, {include:User})
  const answers = await Answer.findAll({
    where: {
      questionId
    }
  })
  res.json(question);
  res.json(answers)
}));

router.get('/:questionId/answers', asyncHandler(async (req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const answers = await Answer.findAll({
    where: {
      questionId
    }
  })
  res.json(answers)
}));



router.put('/:questionId', validateAnswer, asyncHandler(async(req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const questionToUpdate = await Question.findByPk(questionId)
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
			return res.json(questionToUpdate)
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
  }

}))

router.delete('/:questionId', asyncHandler(async (req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  const questionToDelete = await Question.findByPk(questionId)
  if (questionToDelete) {
    await questionToDelete.destroy()
    return res.json(questionToDelete)
  } else {
    res.send("Question not found")
  }

}))


// router.get('/new', asyncHandler(async(req, res) => {
//   let id = parseInt(req.params.id, 10)
//   const question

// }))
// router.post('', asyncHandler(async(req, res) => {

// }));

module.exports = router;
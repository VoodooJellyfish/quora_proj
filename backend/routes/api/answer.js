const express = require('express');
const router = express.Router();
// Since we're doing database stuff, you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const { User, Question, Answer } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateAnswer = [
  check('answer')
    .exists({checkFalsy: true})
    .withMessage("Please provide content for your answer"),
  handleValidationErrors
]

router.get('/:answerId', asyncHandler(async (req, res) => {
  let answerId = parseInt(req.params.answerId, 10);
  const answer = await Answer.findByPk(answerId, {include:Question})
  res.json(answer)
}));

router.put('/:answerId', validateAnswer, asyncHandler(async(req, res) => {
  let answerId = parseInt(req.params.answerId, 10);
  const answerToUpdate = await Answer.findByPk(answerId, {include:Question})
  const {
    answer
  } = req.body

  const newAnswer = {
    answer, 
  }
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
			await answerToUpdate.update(newAnswer);
      // console.log("THIS IS MY Answer", newAnswer)
			return res.json(answerToUpdate)
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
  }

}))


router.delete('/:answerId', asyncHandler(async (req, res) => {
  let answerId = parseInt(req.params.answerId, 10);
  const answerToDelete = await Answer.findByPk(answerId, {include:Question})
  if (answerToDelete) {
    await answerToDelete.destroy()
    return res.json(answerToDelete)
  } else {
    res.send("Answer not found")
  }

}))
module.exports = router;

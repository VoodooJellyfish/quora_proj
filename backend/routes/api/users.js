const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Question, Answer } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateAnswer = [
  check('answer')
    .exists({checkFalsy: true})
    .withMessage("Please provide content for your answer"),
  handleValidationErrors
]

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validateQuestion = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your question"),
]

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// GET /api/users/:userId
router.get('/:userId', asyncHandler(async (req, res) => {
  let userId = parseInt(req.params.userId, 10);
  const userQuestions = await Question.findAll({
    where: {
      ownerId: userId
    },
  })
  res.json(userQuestions);
}));

router.get('/:userId/answers', asyncHandler(async (req, res) => {
  let userId = parseInt(req.params.userId, 10);
  const userAnswers = await Answer.findAll({
    where: {
      userId
    },
  })
  res.json(userAnswers);
}));

router.post('/:userId/question', validateQuestion, asyncHandler(async (req, res) => {
  let userId = parseInt(req.params.userId, 10);
  const {title, description} = req.body
  
  const question = Question.build({
    ownerId: userId,
    title,
    description
  })
  const ValidatorErrors = validationResult(req)
  if(ValidatorErrors.isEmpty()) {
    await question.save()
    let result = await Question.findByPk(question.id, {include:User})
    return res.json(result)
  }

  res.json(question);
}));

router.post('/:userId/questions/:questionId/answers', validateAnswer, asyncHandler(async (req, res) => {
  let questionId = parseInt(req.params.questionId, 10);
  let userId = parseInt(req.params.userId, 10);
  const {answer} = req.body
  
  const newAnswer = Answer.build({
    userId,
    questionId,
    answer,
  })
  const ValidatorErrors = validationResult(req)
  if(ValidatorErrors.isEmpty()) {
    await newAnswer.save()
    res.json(newAnswer)
  }
}));



module.exports = router;
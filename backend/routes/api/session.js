const express = require('express')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.post(
  '/demo',
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    // const demoUser = await User.findOne({
    //   where:{ username: credential}
    // })

    if (credential ==='Demo-lition') {
      const rand = Math.floor(Math.random() * 123456789);
			const hashedPassword = await bcrypt.hash(password, 12);

      const newDemo = await User.build({
        username: `demo${rand}`,
        email: `demo${rand}@demo.com`,
        hashedPassword:hashedPassword
      })

      await newDemo.save()
      const user = await User.login({
        credential:user.username,
        password:'password'
      })
      if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    }
    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);




module.exports = router;
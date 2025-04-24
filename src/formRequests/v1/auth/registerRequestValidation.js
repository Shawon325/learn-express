import { body } from 'express-validator';
import prisma from '../../../services/prisma/prisma';

const registerRequestValidation = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address')
      .custom(async (value) => {
        const user = await prisma.user.findFirst({
          where: { email: value },
        });

        if (user) {
          return Promise.reject('Email already taken');
        }
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ];
};

export default registerRequestValidation;

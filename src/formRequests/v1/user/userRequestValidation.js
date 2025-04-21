import { body } from 'express-validator';
import prisma from '../../../services/prisma/prisma';

const userRequestValidation = () => {
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

    body('fatherName')
      .trim()
      .notEmpty()
      .withMessage('Father Name is required')
      .isString()
      .withMessage('Father Name must be a string'),

    body('motherName')
      .trim()
      .notEmpty()
      .withMessage('Mother Name is required')
      .isString()
      .withMessage('Mother Name must be a string'),

    body('phoneNo')
      .trim()
      .notEmpty()
      .withMessage('Phone Number is required')
      .isString()
      .withMessage('Phone Number must be a string')
      .custom(async (value) => {
        const user = await prisma.user.findFirst({
          where: { phoneNo: value },
        });

        if (user) {
          return Promise.reject('Phone Number already taken');
        }
      }),
  ];
};

export default userRequestValidation;

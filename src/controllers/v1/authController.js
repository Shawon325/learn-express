import prisma from '../../services/prisma/prisma';
import logger from '../../services/logger/loggerService';
import { success, error } from '../../helpers/apiResponse';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcryptjs';
import { signToken } from '../../helpers/jwt';
import {
  HTTP_OK,
  HTTP_VALIDATION_ERROR,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../../constants/statusCode';

const login = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response
        .status(HTTP_VALIDATION_ERROR)
        .json({
          errors: errors.array(),
        });
    }

    const {
      email,
      password,
    } = request.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return response.status(HTTP_NOT_FOUND).send(error('User not found'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(HTTP_UNAUTHORIZED).send(error('Invalid password'));
    }

    const token = signToken(user.id, email);

    delete user.password;

    return response.status(HTTP_OK).send(success({
      user: user,
      token: token,
    }, 'Login successful'));
  } catch (exception) {
    logger.error(`auth-controller login : ${exception.message} `);

    return response
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(error(exception.message));
  }
}

const register = async (request, response) => {
  try {

  } catch (exception) {

  }
}

export { login, register };

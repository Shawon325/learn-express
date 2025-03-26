import prisma from '../../services/prisma/prisma';
import logger from '../../services/logger/loggerService';
import { success, error } from '../../helpers/apiResponse';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcryptjs';
import {
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NO_CONTENT,
  HTTP_OK,
  HTTP_VALIDATION_ERROR,
} from '../../constants/statusCode';

const index = async (request, response) => {
  try {
    const users = await prisma.user.findMany();

    return response.status(HTTP_OK).send(success(users, 'Users data fetch successfully', HTTP_OK));
  } catch (exception) {
    logger.error(`user-controller index : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
  }
};

const store = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(HTTP_VALIDATION_ERROR).json({
        errors: errors.array(),
      });
    }

    const {
      name, email, fatherName, motherName, image, password, phoneNo,
    } = request.body;

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        fatherName: fatherName,
        motherName: motherName,
        image: image,
        password: encryptPassword,
        phoneNo: phoneNo,
      },
    });

    return response.status(HTTP_CREATED).send(success(user, 'User created successfully', HTTP_CREATED));
  } catch (exception) {
    logger.error(`user-controller store : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
  }
};

const show = async (request, response) => {
  try {
    const id = parseInt(request.params.id) || 0;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return response.status(HTTP_OK).send(success(user, 'User found successfully', HTTP_OK));
  } catch (exception) {
    logger.error(`user-controller show : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
  }
};

const update = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(HTTP_VALIDATION_ERROR).json({
        errors: errors.array(),
      });
    }

    const id = parseInt(request.params.id) || 0;

    const {
      name, email, fatherName, motherName, image, password, phoneNo,
    } = request.body;

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        fatherName: fatherName,
        motherName: motherName,
        image: image,
        password: encryptPassword,
        phoneNo: phoneNo,
      },
    });

    return response.status(HTTP_CREATED).send(success(user, 'User updated successfully', HTTP_CREATED));
  } catch (exception) {
    logger.error(`user-controller update : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
  }
};

const destroy = async (request, response) => {
  try {
    const id = parseInt(request.params.id) || 0;

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return response.status(HTTP_OK).send(success(user, 'User deleted successfully', HTTP_NO_CONTENT));
  } catch (exception) {
    logger.error(`user-controller delete : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
  }
};

export { index, store, show, update, destroy };

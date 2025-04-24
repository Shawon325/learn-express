import jwt from 'jsonwebtoken';
import { error } from '../helpers/apiResponse';
import logger from '../services/logger/loggerService';
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_UNAUTHORIZED,
} from '../constants/statusCode';

const authMiddleware = (request, response, next) => {
  try {
    const token = request.headers['x-access-token'];

    if (!token) {
      return response.status(HTTP_UNAUTHORIZED).json(error('Unauthorized'));
    }

    request.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    logger.info('Token verified');

    return next();
  } catch (exception) {
    logger.error(`auth-middleware : ${exception.message} `);

    return response.status(HTTP_INTERNAL_SERVER_ERROR).json(error(exception.message));
  }
};

export default authMiddleware;

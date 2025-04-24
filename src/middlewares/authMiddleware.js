import jwt from 'jsonwebtoken';
import { error } from '../helpers/apiResponse';
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_UNAUTHORIZED,
} from '../constants/statusCode';

const authMiddleware = (request, response, next) => {
  const token = request.headers['x-access-token'];

  if (!token) {
    return response.status(HTTP_UNAUTHORIZED).json(error('Unauthorized'));
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (exception) {
    return response.status(HTTP_INTERNAL_SERVER_ERROR).json(error(exception.message));
  }

  return next();
}

export default authMiddleware;

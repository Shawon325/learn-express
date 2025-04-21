import { HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from '../constants/statusCode';

export const success = (
  data = null,
  message = '',
  code = HTTP_OK,
  meta = {}
) => {
  return {
    meta,
    data: data ?? [],
    message,
    code,
  };
};

export const error = (message = '', code = HTTP_INTERNAL_SERVER_ERROR) => {
  return {
    message,
    code,
  };
};

import jwt from 'jsonwebtoken';

const signToken = (id, email) => {
  let payload = {
    id: id,
    email: email,
  };

  let additional = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7days',
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY,
    additional
  );
};

export { signToken };

import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

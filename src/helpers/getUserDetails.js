import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getUserDetails = () => {
  const cookieStorage = cookies();
  const token = cookieStorage.get('token')?.value || '';

  if (!token) {
    console.error('Token not found');
    return false;
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return false;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.info('Token successfully verified');
    return decodedToken.id;

  } catch (error) {
    console.error('Token verification error:', error.message);
    return false;
  }
};

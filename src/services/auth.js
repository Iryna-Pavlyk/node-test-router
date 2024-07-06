import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { ACCES_TOKEN_TIME, REFRESH_TOKEN_TIME } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  const userID = user._id;
  await Session.deleteOne({ userId: userID });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: userID,
    accessToken,
    refreshToken,
    accessTokenValidUntil: ACCES_TOKEN_TIME,
    refreshTokenValidUntil: REFRESH_TOKEN_TIME,
  });
};

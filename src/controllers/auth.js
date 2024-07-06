import { ONE_DAY, REFRESH_TOKEN_TIME } from '../constants/index.js';
import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { refreshToken, _id, accessToken } = await loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: REFRESH_TOKEN_TIME,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: REFRESH_TOKEN_TIME,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: accessToken,
    },
  });
};

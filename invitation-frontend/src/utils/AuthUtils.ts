import {
  DefaultRegisterDataProps,
  AttemptUserLogin
} from '../common/interfaces';
import { ILoggedInUser } from '../common/interfaces';

const { REACT_APP_API_URL } = process.env;

export const sendRegisterApi = async (
  params: DefaultRegisterDataProps
): Promise<Response> => {
  const response = await fetch(`${REACT_APP_API_URL}/api/registration`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
};

export const sendLoginApi = async (
  params: AttemptUserLogin
): Promise<Response> => {
  const response = await fetch(`${REACT_APP_API_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
};

export const upsertUserInfoToLocalStorage = (userInfo: ILoggedInUser): void => {
  localStorage.setItem('user', JSON.stringify(userInfo));
};

export const getUserInfo = (): ILoggedInUser | null => {
  const userInfoInString = localStorage.getItem('user');

  if (userInfoInString !== null) {
    return JSON.parse(userInfoInString);
  }

  return userInfoInString;
};

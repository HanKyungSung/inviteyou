import { getUserInfo } from './AuthUtils';
import { ILoggedInUser } from '../common/interfaces';

const { REACT_APP_API_URL } = process.env;

export const deleteParticipateApi = async (name: string): Promise<Response> => {
  const authUser: ILoggedInUser | null = getUserInfo();

  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp`, {
    method: 'DELETE',
    body: JSON.stringify({
      name: name
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authUser?.token}`
    }
  });

  return response;
};

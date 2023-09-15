import { getUserInfo } from './AuthUtils';
import { ILoggedInUser } from '../common/interfaces';
interface IEditParticipateApi {
  _id?: object;
  name: string;
  participate: string;
  side: string;
  menu: string;
  note: string;
  targetUserName?: string;
  subdomain?: string;
}

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

export const deleteParticipateSecondApi = async (
  name: string
): Promise<Response> => {
  const authUser: ILoggedInUser | null = getUserInfo();

  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp/v3`, {
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

export const sendPostRsvpApi = async (
  params: IEditParticipateApi
): Promise<Response> => {
  const authUser: ILoggedInUser | null = getUserInfo();
  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp/v3`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authUser?.token}`
    }
  });

  return response;
};

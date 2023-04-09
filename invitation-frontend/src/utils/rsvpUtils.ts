interface RsvpParams {
  name: string;
  participate: string;
  menu: string;
  note: string;
  subdomain?: string;
}

interface sendRsvpApiSecondVersionProps {
  name: string;
  participate: string;
  adultCount: number;
  childCount?: number;
  note: string;
  subdomain?: string;
}

const { REACT_APP_API_URL } = process.env;

export const getParticipants = async (subdomain: string): Promise<Response> => {
  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp/list?subdomain=${subdomain}`);
  
  return response;
};

export const sendRsvpApi = async (params: RsvpParams): Promise<void> => {
  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const sendRsvpApiSecondVersion = async (params: sendRsvpApiSecondVersionProps): Promise<void> => {
  const response = await fetch(`${REACT_APP_API_URL}/api/rsvp`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

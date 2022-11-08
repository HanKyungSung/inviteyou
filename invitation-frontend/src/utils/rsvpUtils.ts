interface RsvpParams {
  name: string;
  participate: string;
  menu: string;
  note: string;
}

export const sendRsvpApi = async (params: RsvpParams): Promise<void> => {
  const { REACT_APP_API_URL } = process.env;

  const response = await fetch(`${REACT_APP_API_URL}/rsvp`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log('response', response);
};

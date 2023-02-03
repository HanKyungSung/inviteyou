export const getIcsFile = async (subdomain: string): Promise<void> => {
  const { REACT_APP_API_URL } = process.env;

  const response = await fetch(`${REACT_APP_API_URL}/api/calendar?subdomain=${subdomain}`);

  if (response.status === 200) {
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    let downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'event.ics';
    downloadLink.click();
  }
  console.log(response, REACT_APP_API_URL);
};

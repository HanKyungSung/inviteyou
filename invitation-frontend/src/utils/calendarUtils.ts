interface getIcsFileProps {
  subdomain: string;
}

export const getIcsFile = async (props: getIcsFileProps): Promise<void> => {
  const { REACT_APP_API_URL } = process.env;
  const { subdomain } = props;

  const response = await fetch(
    `${REACT_APP_API_URL}/api/calendar?subdomain=${subdomain}`
  );

  if (response.status === 200) {
    // TODO:  Currently we are creating temporary link to download the file.
    //        Ideally we should redirect the download backend -> frontend.
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    // Eslint pointed that need to use 'const' instead of 'let'
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'event.ics';
    downloadLink.click();
  }
  console.log(response, REACT_APP_API_URL);
};

import fs from 'fs';

export const updateIndexfile = (subdomain: string, indexFilePath: string): string => {
  const indexFile = fs.readFileSync(indexFilePath, 'utf8');
  // Once we set the PUBLIC_URL in .env file, we need to update the code below.
  const replacedPublicUrlIndexFile = indexFile.replace(/%PUBLIC_URL%/g, '');

  if(subdomain === 'we') {
    // This is where we can modify the build/index.html file.
    // The purpose of this is to update the tags in the head tag in html.
    const updatedIndexFile = replacedPublicUrlIndexFile
      .replace(
        "<title>Inviteyou</title>",
        "<title>You have been invited!</title>"
      )
      .replace(
        "<meta name=\"description\" content=\"Mobile Invitation/RSVP for Wedding\" data-rh=\"true\"/>",
        "<meta name=\"description\" content=\"Welcome to Han & Jenny wedding!\" data-rh=\"true\"/>",
      )
      .replace(
        "<meta property=\"og:image\" content=\"/og_imgs/default_og_img.jpg\">",
        "<meta property=\"og:image\" content=\"/og_imgs/we_og_img.png\">"
      );
    // Debug purpose
    console.log(updatedIndexFile);
    
    return updatedIndexFile;
  } else if (subdomain === 'sne') {
    const updatedIndexFile = replacedPublicUrlIndexFile
      .replace(
        "<title>Inviteyou</title>",
        "<title>You have been invited!</title>"
      )
      .replace(
        "<meta name=\"description\" content=\"Mobile Invitation/RSVP for Wedding\" data-rh=\"true\"/>",
        "<meta name=\"description\" content=\"Welcome to Sam & Eunhee wedding!\" data-rh=\"true\"/>",
      )
      .replace(
        "<meta property=\"og:image\" content=\"/og_imgs/default_og_img.jpg\">",
        "<meta property=\"og:image\" content=\"/og_imgs/sne_og_img.png\">"
      );
    // Debug purpose
    console.log(updatedIndexFile);

    return updatedIndexFile;
  }

  return replacedPublicUrlIndexFile;
};

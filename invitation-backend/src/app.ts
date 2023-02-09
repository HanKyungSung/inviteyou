import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';
import connectDB from './utils/connectDB';
import userRoute from './routes/user.route';
import rsvpRoute from './routes/rsvp.route';

dotenv.config();

const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '..', '..', 'invitation-frontend', 'build'));

const indexFilePath = path.join(__dirname, '..', '..', 'invitation-frontend', 'build', 'index.html');
// const indexFilePath = path.join(__dirname, '..', '..', 'invitation-frontend', 'public', 'index.html');
app.get('/', (req, res) => {

  if (req.subdomains.length != 1) {
    res.redirect('https://inviteyou.ca');
  }

  const indexFile = fs.readFileSync(indexFilePath, 'utf8');

  // This is where we can modify the build/index.html file.
  // The purpose of this is to update the tags in the head tag in html.
  const updatedIndexFile = indexFile.replace("<title>Inviteyou</title>", "<title>test</title>");

  // Below code is for future reference purpose.
  // fs.writeFileSync(indexFilePath, updatedIndexFile);
  // res.sendFile(path.join(__dirname, '..', '..', 'invitation-frontend', 'build/index.html'));
  res.send(updatedIndexFile);
});

app.use('/', express.static(
    path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
  )
);
// app.use(
//   express.static(
//     path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
//   )
// );
// Routes
app.use('/api/registration', userRoute);

app.use('/api/rsvp', rsvpRoute);

app.get('/api/calendar', (req, res) => {
  // TODO: Modify the ICS file depends on the subdomain query.
  console.log(req.query);
  res.download(path.join(__dirname, '..', 'src/assets/myevents.ics'));
});

// start the Express server
app.listen(port, '127.0.0.1', () => {
  connectDB();
});

export default app;

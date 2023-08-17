import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import connectDB from './utils/connectDB';
import userRoute from './routes/user.route';
import rsvpRoute from './routes/rsvp.route';
import authRoute from './routes/auth.route';
import { updateIndexfile } from './utils/IndexFileUtil';

dotenv.config();

const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '..', '..', 'invitation-frontend', 'build'));

app.get('/', (req, res) => {
  if (req.subdomains.length != 1) {
    res.redirect('https://inviteyou.ca');
  }

  // Production
  const indexFilePath = path.join(__dirname, '..', '..', 'invitation-frontend', 'build', 'index.html');
  const { subdomains } = req;
  // Currently we only handle the one subdomain. ex) we.inviteyou.ca not we.are.inviteyou.ca
  const subdomain = subdomains[0];
  const updatedIndexFile = updateIndexfile(subdomain, indexFilePath);
  console.log(updatedIndexFile)

  res.send(updatedIndexFile);
});

// This route is only for the og-tag testing using Ngrok.
app.get('/test-subdomain/:subdomain', (req, res) => {
  // Development
  const indexFilePath = path.join(__dirname, '..', '..', 'invitation-frontend', 'public', 'index.html');
  const { subdomain } = req.params;
  const updatedIndexFile = updateIndexfile(subdomain, indexFilePath);

  console.log(updatedIndexFile)
  // Below code is for future reference purpose.
  // fs.writeFileSync(indexFilePath, updatedIndexFile);
  // res.sendFile(path.join(__dirname, '..', '..', 'invitation-frontend', 'build/index.html'));
  res.send(updatedIndexFile);
});

app.use('/', express.static(
    path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
  )
);

// Normal static return.
// app.use(
//   express.static(
//     path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
//   )
// );
// Routes
app.use('/api/registration', userRoute);

app.use('/api/login', authRoute)

app.use('/api/rsvp', rsvpRoute);

app.get('/api/calendar', (req, res) => {
  // const icsFilePath = path.join(__dirname, 'assets', 'myevent.ics');
  // console.log('icsFilePath', icsFilePath)
  // const icsFile = fs.readFileSync(icsFilePath, 'utf8');
  // TODO: Modify the ICS file depends on the subdomain query.
  // console.log(req.query);
  const { subdomain } = req.query;

  // let updatedIcsFile = icsFile;
  // console.log(icsFile)
  if (subdomain == 'we') {
    res.download(path.join(__dirname, '..', 'src/assets/myevents.ics'));
  }
  else if (subdomain == 'sne') {
    // TODO: Need to create ics file dynamically.
    // const startDate = new Date("2023-06-17T10:30Z");
    // const endDate = new Date("2023-06-17T15:00Z");
    // const summary = "상호 & 은희 wedding";
    // const description = summary;
    // const location = "5251 Oak St\\,\n Vancouver\\,\n BC V6M 4H1";
    // const url = "sne.inviteyou.ca";
    // console.log(startDate, endDate, location);
    // updatedIcsFile = icsFile.replace("LOCATION:", `LOCATION: ${location}`);
    res.download(path.join(__dirname, '..', 'src/assets/samhan.ics'));
  } else {
    res.sendStatus(400);
  }
});

// start the Express server
app.listen(port, '127.0.0.1', () => {
  connectDB();
});

export default app;

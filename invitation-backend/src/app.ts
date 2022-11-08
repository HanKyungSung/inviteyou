import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static(
    path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
  )
);

app.get('/testing', (req, res) => {
  res.send('hello world');
});

app.post('/rsvp', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// start the Express server
app.listen(port, '127.0.0.1');

export default app;

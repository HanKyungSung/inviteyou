import express from 'express';
import path from 'path';

const app = express();
const port = 8080; // default port to listen

app.use(
  express.static(
    path.join(__dirname, '..', '..', 'invitation-frontend', 'build')
  )
);

app.get('/testing', (req, res) => {
  res.send('hello world');
});

// start the Express server
app.listen(port, '127.0.0.1');

export default app;

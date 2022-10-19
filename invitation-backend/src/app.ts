import express from 'express';
import path from 'path';

const app = express();
const port = 8080; // default port to listen

app.use(express.static(path.join(__dirname, '..', '..', 'invitation-frontend', 'build')));

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

export default app;
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { videoListRouter, productListRouter, commentListRouter } from './routes/routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  { extended: true }
));

app.use('/api/video', videoListRouter);
app.use('/api/product', productListRouter);
app.use('/api/comment', commentListRouter);

app.listen(PORT, () => {
  console.log(`Server listening on localhost ${PORT}`);
})

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('failed to connect', err)
});

db.once('connected', () => {
  console.info('database connected')
});

// app.get('/', (req, res) => {
//   res
//     .send('Halo guys!')
//     .status(200)
// })
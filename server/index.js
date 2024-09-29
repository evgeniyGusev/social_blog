import * as path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import childrenRouter from './routes/children.js';
import communitiesRouter from './routes/communities.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// api router
app.use('/api/childrens', childrenRouter);
app.use('/api/communities', communitiesRouter);

// static files
const staticDir = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(staticDir));
app.use(
  '/uploads/img',
  express.static(path.join(__dirname, '..', 'uploads', 'img'))
);

// frontend router
app.get('*', (req, res) => res.sendFile(path.join(staticDir, 'index.html')));

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('DATABASE OK');

    app.listen(4444, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log('SERVER OK');
    });
  })
  .catch((err) => {
    console.log('DATABASE ERROR', err);
  });

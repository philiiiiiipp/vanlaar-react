/* @flow */

import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const ROBOTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../robots.json')).toString());
const app = express();
app.use('/', express.static(path.resolve(__dirname, '..', 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/robots`, (req, res) => {

});

app.use('*', (req, res) => {
  return res.send('hallo');
});

app.listen(3000, () => {
  console.info('HTTP is running on PORT 3000/');
});

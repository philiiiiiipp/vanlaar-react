/* @flow */

import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

/* Get our "DB" */
const ROBOTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../robots.json')).toString()).splice(0,100);
const HTML = fs.readFileSync(path.resolve(__dirname, '../index.html')).toString();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/robots`, (req, res) => {
  setTimeout(function () {
    res.json(ROBOTS);
  }, 1000);
});

app.use(`/api/getRobot`, (req, res) => {
  const id = req.query.id;
  const robot = ROBOTS.find((robot) => robot.id.$oid === id);
  return res.json(robot);
});

app.use('*', (req, res) => res.send(HTML));

app.listen(3000, () => {
  console.info('HTTP is running on PORT 3000/');
});

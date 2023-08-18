import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import jquery from 'jquery';
import config from './config.json';

const app = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || config.port);

app.listen(PORT, () => console.log('Server started on port ' + PORT));
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import cheerio, { load } from 'cheerio';
import config from './config.json'; 

const app = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || config.port);

axios(config.url)
    .then((response: AxiosResponse) => {
        const html = response.data;
        const $ = load(html); 
        const elements: any[] = [];
        $("h2.application-updates", html).each(function() {
            console.log("found element");
            const body = $(this).text();
            const text = $(this).find('p').text();
            elements.push({
                body,
                text
            });
        });
        console.log(elements);
    }).catch((err: Error) => console.log(err));

app.listen(PORT, () => console.log('Server started on port ' + PORT));

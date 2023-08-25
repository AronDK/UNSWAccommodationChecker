import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import cheerio, { load } from 'cheerio';
import config from './config.json'; 
import email, { sendNotif } from './email';

const app = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || config.port);

axios(config.url)
    .then((response: AxiosResponse) => {
        const html = response.data;
        const $ = load(html); 
 
        const res: any = {
            res24: Boolean, 
            res23: Boolean 
        };
        res.res24 = false;
        res.res23 = false;

        $(".inner", html).each(function() {
            const text24 = $(this).find("p").text().includes("Applications are now open for 2024!");
            const text23 = $(this).find("p").text().includes("Applications are now open for 2023!");

            res.res24 = text24 || res.res24;
            res.res23 = text23 || res.res23;
        });
        console.log(res);
        sendNotif(res);
        
    }).catch((err: Error) => console.log(err));

app.listen(PORT, () => console.log('Server started on port ' + PORT));

import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import productController from "./routers/ProductRouter";

const app: Application = express();
const port: number = 5000;
const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
app.use(cors(options));
app.use(bp.json());

//uses (añadir las nuevas url)
app.use("/product", productController)

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});


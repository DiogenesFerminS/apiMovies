import express, { json } from 'express';
import { createRoutes } from './routes/movies-routes.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({movieModel})=>{
    //crea el servidor de express
    const app = express();
    //Hace accesible el body del req y los parsea = convierte el json a Object
    app.use(json());
    //Selecciona el puerto
    const PORT = process.env.PORT ?? 3000;

    //ORIGENES ACEPTADOS
    app.use(corsMiddleware());

    app.use('/movies',createRoutes({movieModel}));

    //se desactiva para la seguridad
    app.disable('x-powered-by');

    //se inicia el servidor en el puerto 
    app.listen(PORT, ()=>{
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    })
};


import express, { json } from 'express';
import { createRoutes } from './routes/movies-routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config.js';

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

    //Solucion Paolo
    // app.use((req, res)=>{
    //    return res.status(404).json({message: 'Route not found'});
    // });

    //Solucion Rafael
    app.all('/*splat', (req, res, next)=>{
        res.status(404).json({message: 'Route not found'});
    })

    app.use((err, req, res, next)=>{
        //console.log(err);
        const {status = 500, message = 'Internal Server Error'} = err;
        res.status(status).json({message});
    });

    app.listen(PORT, ()=>{
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    })
};

const serverType = process.env.SERVER_TYPE ?? 'local';

if(serverType === 'local'){
    const {MovieModel} = await import('./models/local-file-system/movie.js');
    createApp({movieModel: MovieModel});
} else if (serverType === 'mysql') {
    const {MovieModel} = await import('./models/mySql/movie.js');
    createApp({movieModel: MovieModel});
}


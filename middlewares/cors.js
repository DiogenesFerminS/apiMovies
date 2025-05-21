import cors from 'cors';

const ACCEPTED_ORIGINS = [
            'http://127.0.0.1:5500/clase-2/web/',
            'http://127.0.0.1:5500/',
            'http://localhost:8080'
        ];

export const corsMiddleware = ({aceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) =>{

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true);
        };

        if(!origin){
            return callback(null, true);
        };

        return callback(new Error('Not allowed by CORS'));
    }
});
import { Router } from 'express';
import { MoviesController } from '../controllers/movies.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { createMovieDTO } from '../models/movies/dtos/create.js';
import { updateMovieDTO } from '../models/movies/dtos/update.js';

export const createRoutes = ({movieModel})=>{
    const moviesRouter = Router();

    const movieController = new MoviesController({movieModel})

    //obtener todos 
    moviesRouter.get('/', movieController.getAll);

    //Obtener por id
    moviesRouter.get('/:id', movieController.getById);

    //AGREGAR UNA MOVIE
    moviesRouter.post('/', validationMiddleware(createMovieDTO, 'body'), movieController.create);

    //editar parcialmente una movie
    moviesRouter.patch('/:id',validationMiddleware(updateMovieDTO, 'body') ,movieController.update);

    //Eliminar una movie
    moviesRouter.delete('/:id', movieController .delete);

    return moviesRouter
}

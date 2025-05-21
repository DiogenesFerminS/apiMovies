import { Router } from 'express';
import { MoviesController } from '../controllers/movies.js';

export const createRoutes = ({movieModel})=>{
    const moviesRouter = Router();

    const movieController = new MoviesController({movieModel})

    //obtener todos 
    moviesRouter.get('/', movieController.getAll);

    //Obtener por id
    moviesRouter.get('/:id', movieController.getById);

    //AGREGAR UNA MOVIE
    moviesRouter.post('/', movieController.create);

    //editar parcialmente una movie
    moviesRouter.patch('/:id', movieController.update);

    //Eliminar una movie
    moviesRouter.delete('/:id', movieController .delete);

    return moviesRouter
}

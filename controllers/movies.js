
export class MoviesController{
    constructor ({movieModel}){
        this.movieModel = movieModel;
    }

    getAll = async(req, res)=>{
        //se saca el query del url ejemplo /urlbas?genre=Drama
        const {genre} = req.query;
        
        const movies = await this.movieModel.getAll({genre});

        if(movies === null){
            throw new Error('No movies found');
        }
        // si no se retornan todos
        res.json(movies);
    };

    getById = async (req, res)=>{
        const {id} = req.params;
        const movie = await this.movieModel.getById({id});

        if(movie != null){
            res.json(movie);
        }else{
            throw new Error('Invalid id');
        }
    };

    create = async (req, res)=>{
         //Se envia a la schema de zod a validar los tipos y retorna succes o error
        const result = validateMovie(req.body);
    
         if(result.error){
            throw new Error('Data invalid');
        }  
        //se guardaria en base de datos
        const newMovie = await this.movieModel.create({ input: res.body }); // await this.movieModel.create({input: result.data});
        // se retorna la respuesta
        res.status(201).json(newMovie);
    };

     update = async (req, res)=>{
         //Evaluamos que la informacion que se quiere modificar es valida
        // const result = validatePartialMovie(req.body);
        
        // if(result.error){
        //     throw new Error('Data invalid');
        // }
    
        const {id} = req.params;
        
        const newMovie = await this.movieModel.update({id, input:req.body});
    
        res.status(200).json(newMovie);
    };

     delete = async (req, res)=>{
        const {id} = req.params;

        const result = await this.movieModel.delete({id});

        if(result === false){
            throw new Error('Movie not found');
        };
        return res.json({message: 'Movie delete'});
        }
}
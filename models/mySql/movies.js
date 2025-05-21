import mysql from "mysql2/promise";

const config = {
    host: 'localhost',
    user: 'root',
    port: 4000,
    password: '',
    database: 'moviesdb'
};

const connection = await mysql.createConnection(config);

export class MovieModel {
    //TRAE TODAS LAS PELICULAS
    static getAll = async({genre})=>{

        if(genre){
            const lowerGenre = genre.toLowerCase();
           const [movies] = await connection.query(
            'SELECT BIN_TO_UUID(m.id), m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie m JOIN movie_genre mg ON m.id = mg.movie_id JOIN genre g ON mg.genre_id = g.id WHERE LOWER(g.name) = ?; ', [lowerGenre]
           )

           if(movies.length === 0) return null;

            return movies;
        }

         const [result, tableInfo] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
         );

        return result
    };

    //TRAE UNA PELICULA POR ID
    static getById = async({id})=>{
       const [result, tableInfo] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);', [id]
       );

       if(result.length === 0) return null;

       return result;
    };

    //CREA UNA PELICULA
    static create = async ({input}) =>{
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate,
            genre
        } = input

        const [uuidResult] = await connection.query(
            `SELECT UUID() uuid`
        )
        
        const [{uuid}] = uuidResult;

        try {
            
            const result = await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
             VALUE
             (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)
            `, [title, year, director, duration, poster, rate]
            );

        } catch (error) {
            throw new Error('Failed create movie');
        }
        
        const [newMovie, tableInfo] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?); `, [uuid]
        )

        return newMovie;
    };

    //ELIMINA UNA PELICULA
    static delete = async({id})=>{
        try {
            await connection.query('DELETE FROM movie WHERE id = ?;',[id]);
            return true;
        } catch (error) {
            throw new Error("Failed delete movie")
        }
    };

    //ACTUALIZA UNA PELICULA
    static update = async({id, input}) =>{
        
        const [movieReference, tableInfo] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [id]
        );
        
        const [{title, year, director, duration, poster, rate}] = movieReference;
        const movie = {
            id,
            title,
            year,
            director,
            duration,
            poster,
            rate,
        };

        const updateMovie = {
            ...movie,
            ...input
        };

        try {
            const result = await connection.query(
                `UPDATE movie 
                SET 
                title = ?,
                year = ?,
                director = ?,
                duration = ?,
                poster = ?,
                rate = ?
                WHERE ID = UUID_TO_BIN(?)
                `, [updateMovie.title, updateMovie.year, updateMovie.director, updateMovie.duration,  updateMovie.poster, updateMovie.rate, id]
            );

            return updateMovie;
        } catch (error) {
            throw new Error("Failed update");
        }
        
        
    }
}
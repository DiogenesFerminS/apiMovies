import {randomUUID} from "node:crypto";
import { readJSON } from "../../utils/readJSON.js";

const movies = readJSON('../movies.json');

export class MovieModel {
    //TRAE TODAS LAS PELICULAS
    static getAll = async({genre})=>{
         //si hay un genero se busca
            if(genre){
                return movies.filter(
                    movies => movies.genre.some(g => g.toLowerCase() === genre.toLowerCase())
                );
            }
        //Si no se retorna todas las peliculas
            return movies;
    };

    //TRAE UNA PELICULA POR ID
    static getById = async({id})=>{
        const movie = movies.find(m => m.id === id);
        return movie;
    };

    //CREA UNA PELICULA
    static create = async ({input}) =>{
     //se guardaria en base de datos
        const newMovie = {
            id: randomUUID(),
            ...input
        };
    
        movies.push(newMovie);

        return newMovie
    };

    //ELIMINA UNA PELICULA
    static delete = async({id})=>{
    const movieIndex = movies.findIndex(m => m.id === id);
        if(movieIndex < 0)return false;

        movies.splice(movieIndex, 1);
        return true;
    };

    //ACTUALIZA UNA PELICULA
    static update = async({id, input}) =>{
        const movieIndex = movies.findIndex(m => m.id === id);
        
            if(movieIndex < 0) return false;
        
            const movie = movies[movieIndex];
        
            const newMovie = {
                ...movie,
                ...input
            };
        
            movies[movieIndex] = newMovie;

            return newMovie;
    }
}
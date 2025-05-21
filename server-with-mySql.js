import { createApp } from "./app.js";
import { MovieModel } from "./models/mySql/movies.js";


createApp({movieModel: MovieModel});
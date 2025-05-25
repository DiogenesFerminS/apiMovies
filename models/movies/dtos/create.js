import z from 'zod/v4';

export const createMovieDTO = z.object({
    title: z.string("Title is required").min(5, "Title must have at least 5 chars").max(100),
    year: z.number("Year is required").min(1900, "Year must be greater than 1900").max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crimen'])
    )
}, 'Invalid movie data');
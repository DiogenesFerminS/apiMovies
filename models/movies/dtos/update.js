import z from 'zod/v4';

export const updateMovieDTO = z.object({
    title: z.string("Title is required").min(5, "Title must have at least 5 chars").max(100).optional(),
    year: z.number("Year is required").min(1900, "Year must be greater than 1900").max(2025).optional(),
    director: z.string().optional(),
    duration: z.number().int().positive().optional(),
    rate: z.number().min(0).max(10).default(5).optional(),
    poster: z.string().url().optional(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crimen'])
    ).optional()
}, 'Invalid movie data');
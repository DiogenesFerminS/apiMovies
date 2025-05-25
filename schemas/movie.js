import z from 'zod/v4';

 const movieSchema = z.object({
        title: z.string(),
        year: z.number().min(1900).max(2025),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5),
        poster: z.string().url(),
        genre:z.array(
            z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crimen'])
        )
});

export const validateMovie = (object)=>{
    return movieSchema.safeParse(object);
};

export const validatePartialMovie = (object) => {
    return movieSchema.partial().safeParse(object);
}

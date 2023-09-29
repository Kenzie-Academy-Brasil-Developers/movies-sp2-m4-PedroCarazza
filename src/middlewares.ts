import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";

export const isMovieNameUnique = async (req: Request, res: Response, next: NextFunction) => {
    const query = format(`SELECT * FROM movies WHERE name = %L;`, req.body.name);

    const data = await client.query(query);

    if(data.rows[0]){
        return res.status(409).json({message: "Movie name already exists!"})
    }

    return next();

}

export const isMovieIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const query = format(`SELECT * FROM movies WHERE id = %L;`, req.params.id);

    const data = await client.query(query);

    if(!data.rows[0]){
        return res.status(404).json({message: "Movie not found!"})
    }

    return next();

}


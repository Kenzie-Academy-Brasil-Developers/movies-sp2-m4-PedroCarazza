import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";
import { IMovie } from "./interfaces";

export const createMovie = async (req: Request, res: Response) => {
  const newMovie: Omit<IMovie, "id"> = {
    name: req.body.name,
    category: req.body.category,
    duration: req.body.duration,
    price: req.body.price,
  };

  const query = format(
    `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newMovie),
    Object.values(newMovie)
  );

  const data = await client.query(query);

  return res.status(201).json(data.rows[0]);
};

export const getAllMovies = async (req: Request, res: Response) => {
  let query = `SELECT * FROM movies;`;

  if (req.query.category) {
    query = format(
      `SELECT * FROM movies WHERE category ILIKE %L;`,
      req.query.category
    );
  }

  let data = await client.query(query);

  if (req.query.category && data.rows.length === 0) 
  {
    const backupQuery = `SELECT * FROM movies;`;

    data = await client.query(backupQuery);
  }
  return res.status(200).json(data.rows);
};

export const getOneMovie = async (req: Request, res: Response) => {
  const query = format(`SELECT * FROM movies WHERE id = %L`, req.params.id);

  const data = await client.query(query);

  return res.status(200).json(data.rows[0]);
};

export const updateMovie = async (req: Request, res: Response) => {
  const query = format(
    `UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
    Object.keys(req.body),
    Object.values(req.body),
    req.params.id
  );

  const data = await client.query(query);

  res.status(200).json(data.rows[0]);
};

export const deleteMovie = async (req: Request, res: Response) => {
  const query = format(`DELETE FROM movies WHERE id = %L;`, req.params.id);

  await client.query(query);

  return res.status(204).json();
};

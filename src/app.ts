import "dotenv/config";
import express from "express";
import { connectDatabase } from "./database";
import { createMovie, deleteMovie, getAllMovies, getOneMovie, updateMovie } from "./logic";
import { isMovieIdValid, isMovieNameUnique} from "./middlewares";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`API started in port ${PORT}`)
    connectDatabase()
});

app.post("/movies", isMovieNameUnique, createMovie);
app.get("/movies", getAllMovies);
app.get("/movies/:id", isMovieIdValid, getOneMovie);
app.patch("/movies/:id", isMovieIdValid, isMovieNameUnique, updateMovie);
app.delete("/movies/:id", isMovieIdValid, deleteMovie);


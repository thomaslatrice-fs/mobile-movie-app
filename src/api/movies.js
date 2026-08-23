import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getMovies = () => api.get("/movies");
export const getMovie = (id) => api.get(`/movies/${id}`);
export const createMovie = (movie) => api.post("/movies", movie);
export const updateMovie = (id, movie) => api.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

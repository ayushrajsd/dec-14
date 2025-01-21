const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      message: "Movie added successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Failed to add movie",
      success: false,
    });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      message: "Movies fetched successfully",
      success: true,
      data: allMovies,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Failed to get movies",
      success: false,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      message: "Movie updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Failed to update movie",
      success: false,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // const movieId = req.params.movieId;
    await Movie.findByIdAndDelete(req.body.movieId);
    console.log(req.body.movieId);
    res.send({
      message: "Movie deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Failed to delete movie",
      success: false,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};

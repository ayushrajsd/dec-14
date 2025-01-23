const express = require("express");
const app = express();

require("dotenv").config(); // LOADS ENV VARIABLES INTO PROCESS.ENV

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const auth = require("./middlewares/authMiddleware");
connectDB();

/** Routes */
app.use(express.json()); // ALLOWS EXPRESS TO PARSE JSON
app.use("/api/users", userRouter);
app.use("/api/movies", auth, movieRouter);
app.use("/api/theatres", auth, theatreRouter);
app.use("/api/shows", auth, showRouter);
app.use("/api/bookings", auth, bookingRouter);

app.listen(8082, () => {
  console.log("Listening on port 8082");
});

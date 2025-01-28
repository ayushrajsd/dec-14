const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const path = require("path");

require("dotenv").config(); // LOADS ENV VARIABLES INTO PROCESS.ENV

const apiLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const auth = require("./middlewares/authMiddleware");
const helmet = require("helmet");
connectDB();

const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

app.use(helmet());
app.use(mongoSanitize());

// Custom Content Security Policy (CSP) configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"], // Allow scripts from 'self' and example.com
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
      connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);

/** Routes */
app.use(express.json()); // ALLOWS EXPRESS TO PARSE JSON
app.use("/api/", apiLimited);
app.use("/api/users", userRouter);
app.use("/api/movies", auth, movieRouter);
app.use("/api/theatres", auth, theatreRouter);
app.use("/api/shows", auth, showRouter);
app.use("/api/bookings", auth, bookingRouter);

app.listen(8082, () => {
  console.log("Listening on port 8082");
});

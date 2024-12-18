const express = require("express");

/**
 *
 * 404 page not found
 * 1. we need to watch for every request that comes to the server
 * 2. if the request is not handled by any of the routes, we need to send a 404 response
 */

// create an express app
const app = express();
app.use(express.json());

// logger Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  //   next();
  //   if( authentictedUSer){
  //     next()
  //   }else {
  //     res.status(401).json({message: "Unauthorized"})
  //   }
};

// app.use(loggerMiddleware);

// define a route on the app
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.get("/about", (req, res) => {
  console.log("This is about page");
  res.send("This is about page");
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("This is post request");
});

const users = [
  { id: 1, name: "User1" },
  { id: 2, name: "User2" },
];

// POST endpoint to add a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  // assign the id
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json({ message: "User Created", user: newUser });
});

// DELETE /users/1    DELETE  /users/2
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  console.log("user id to delete", userId);
  // find the user with the given id
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  // remove the user from the array
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

app.get("/users", (req, res) => {
  console.log("get users handler");
  res.status(200).json(users);
});
// enter a url like /users/profile
// get a user by id
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});
// start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

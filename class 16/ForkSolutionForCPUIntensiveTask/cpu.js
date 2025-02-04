const express = require("express");
const cors = require("cors");
const app = express();
const { fork } = require("child_process");
const path = require("path");

app.use(cors());
app.use(express.static("public"));

app.get("/fib", (req, res) => {
  const { number, requestNumber } = req.query;
  console.log("handler fn ran for req", requestNumber);
  if (!number || isNaN(number) || number <= 0) {
    return res
      .status(400)
      .json({ error: "Please provide a valid positive number." });
  }
  const fiboResponse = fork(path.join(__dirname, "fiboFork.js"));
  console.log(
    "Forked new process for req: ",
    requestNumber,
    "with PID: ",
    fiboResponse.pid
  );
  fiboResponse.send({ number });

  fiboResponse.on("message", (answer) => {
    console.log("Sending response for req", requestNumber);
    res.status(200).json({
      status: "success",
      message: answer,
      requestNumber,
    });
    fiboResponse.kill();
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

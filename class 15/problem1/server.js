const fs = require("fs");
// const content = Math.random().toString(36).repeat(10000000);

// fs.writeFileSync(
//   "/Users/kachwaluttamsharma/Desktop/dec-14/class 15/problem1/BigFile.txt",
//   content
// );

// version: 1
// const http = require("http");
// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("before");
//   fs.readFile("./BigFile.txt", (err, data) => {
//     if (err) throw err;
//     res.end(data);
//     console.log("file reading completed");
//   });
//   console.log("after");
// });

// server.listen(3000, () => {
//   console.log("Server started at 3000");
// });

// streams
const http = require("http");
const server = http.createServer();
const path = require("path");

const filePath = path.join(__dirname, "BigFile.txt");
const readableStream = fs.createReadStream(filePath);
const writeableStream = fs.createWriteStream("copyOfBigFile.txt");

// // event driven
// readableStream.on("data", (chunck) => {
//   console.log(`Received ${chunck.length} bytes of data.`);
//   writeableStream.write(chunck);
// });

// readableStream.on("end", () => {
//   writeableStream.end();
//   console.log("Finished Reading  and Writing File");
// });

// readableStream.on("error", (err) => {
//   console.log("Error while reading", err);
// });
// writeableStream.on("error", (err) => {
//   console.log("Error while writing", err);
// });
server.on("request", (req, res) => {
  console.log("before");
  const src = fs.createReadStream(filePath);
  src.pipe(res);
  console.log("after");
});

server.listen(3000, () => {
  console.log("Server started at 3000");
});

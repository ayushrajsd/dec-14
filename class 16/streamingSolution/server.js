const fs = require("fs");
const http = require("http");
const path = require("path");

const filePath = path.join(__dirname, "BigFile.txt");

// Create the server
const server = http.createServer((req, res) => {
  console.log("Request received, streaming file...");

  // Create a readable stream with a custom highWaterMark (chunk size)
  const readableStream = fs.createReadStream(filePath, { highWaterMark: 1024 }); // 1KB chunks

  // Pipe the readable stream directly to the response (streaming file)
  readableStream.pipe(res);

  // Handle errors during streaming
  readableStream.on("error", (err) => {
    console.log("Error while reading the file:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });

  // Log when file is fully streamed
  readableStream.on("end", () => {
    console.log("File streaming completed.");
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});

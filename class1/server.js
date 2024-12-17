const http = require("http");

const server = http.createServer((req, res) => {
  // set resopnse header
  res.setHeader("Content-Type", "text/html"); // MIME type
  // write a response
  //   res.write("Hello World");
  res.write("<html><head><title>Node.js Server</title></head><body>");
  res.write("<h1>Hello World</h1></body></html>");

  // end the response
  res.end();
});

const port = 3000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

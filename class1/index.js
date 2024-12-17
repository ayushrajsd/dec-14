/**
 * file system module - fs
 */

const fs = require("fs"); // CommonJS module syntax
// import fs from "fs" - ES6 module syntax

// fs.readFile("file.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// const content = "Hello, World!";
// fs.writeFile("example.txt", content, "utf8", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File created successfully");
// });

// fs.rename("example.txt", "example2.txt", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File renamed successfully");
// });

// fs.unlink("example2.txt", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File deleted successfully");
// });

// fs.stat("file.txt", (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("File size:" + stats.size);
//   console.log("is directory:" + stats.isDirectory());
// });

// path module
/**
 * file path differs between operating  systems
 * windows - \ (backslash)
 * POSIX - / (forward slash)
 */

const path = require("path");
// const fullPath = path.join("folder", "subFolder", "file.txt");
// const absolutePath = path.resolve("folder", "subFolder", "file.txt");
// const extName = path.extname("./dir/file.txt");
// // console.log(fullPath);
// console.log(extName);

/**
 * copy file from one folder to another - streams
 */

const sourceFilePath = "./dir/file.txt";
const destinationFilePath = "./dir/file2.txt";

// create a readable stream
const readStream = fs.createReadStream(sourceFilePath);

// create a writable stream
const writeStream = fs.createWriteStream(destinationFilePath);

// pipe the read stream to write stream
readStream.pipe(writeStream);

readStream.on("error", (err) => {
  console.error("Error reading the source file", err);
});

writeStream.on("error", (err) => {
  console.error("Error writing the destination file", err);
});

writeStream.on("finish", () => {
  console.log("File copied successfully");
});

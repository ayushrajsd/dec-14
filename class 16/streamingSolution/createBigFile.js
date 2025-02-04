const fs = require("fs");
const content = Math.random().toString(36).repeat(10000);

fs.writeFileSync(
  "/Users/kachwaluttamsharma/Desktop/dec-14/class 16/streamingSolution/BigFile.txt",
  content
);

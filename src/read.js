const fs = require("fs");
const es = require("event-stream");

const readBookmarks = (filename, callback) => {
  let bookmarks = [];

  let bookmarkFound = false;
  let favouriteFound = false;
  let title = "";

  fs.createReadStream(filename, {
    flags: "r"
  })
    .pipe(es.split()) // split by lines
    .pipe(
      es.map(function(line, next) {
        if (bookmarkFound) {
          let link = line.match(/\(([^)]+)\)/)[1];
          bookmarks.push({ title, link, favourite: favouriteFound });

          favouriteFound = false;
          bookmarkFound = false;
        } else if (line.startsWith("###")) {
          title = line.split(" ");
          title.shift(1);
          title = title.join(" ");

          bookmarkFound = true;

          if (line.indexOf("*") > -1) {
            favouriteFound = true;
          }
        }
        next(null, line);
      })
    )
    .pipe(
      es.wait(function(err, body) {
        callback(bookmarks);
      })
    );
};

const readBooks = (filename, callback) => {
  let books = [];

  let bookFound = false;
  let title = "";

  fs.createReadStream(filename, {
    flags: "r"
  })
    .pipe(es.split()) // split by lines
    .pipe(
      es.map(function(line, next) {
        if (bookFound) {
          books.push({
            title,
            author: line
          });

          bookFound = false;
        } else if (line.startsWith("###")) {
          title = line.split(" ");
          title.shift(1);
          title = title.join(" ");

          bookFound = true;
        }
        next(null, line);
      })
    )
    .pipe(
      es.wait(function(err, body) {
        callback(books);
      })
    );
}

exports.readBookmarks = readBookmarks;
exports.readBooks = readBooks;


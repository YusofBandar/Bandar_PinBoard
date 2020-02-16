const read = require("./read");

read.readBookmarks('../bookmarks.md', function (bookmarks) {
    console.log(bookmarks);
})
const read = require("./read");
const bookmark = require("./elements/bookmark");
const ReactDOMServer = require('react-dom/server');

read.readBookmarks('../bookmarks.md', function (bookmarks) {
    let children = [];
    bookmarks.forEach(({link, title}) => {
        children.push(bookmark.render(link, title));
    });
    
})
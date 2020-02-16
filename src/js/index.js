const fs = require('fs');
const es = require('event-stream');

const read = require("./read");
const bookmark = require("./elements/bookmark");
const page = require("./elements/page");

const ReactDOMServer = require("react-dom/server");
const React = require("react");

read.readBookmarks("../bookmarks.md", function(bookmarks) {
  const DOM = ReactDOMServer.renderToStaticMarkup(
    page.render(
      <React.Fragment>
        {bookmarks.map(({ link, title }) => bookmark.render(link, title))}
      </React.Fragment>
    )
  );

  fs.writeFileSync("../static/index.html", DOM);
});

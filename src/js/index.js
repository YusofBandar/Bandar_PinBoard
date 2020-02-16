const fs = require("fs");
const es = require("event-stream");

const read = require("./read");
const bookmark = require("./elements/bookmark");
const book = require("./elements/book");
const page = require("./elements/page");

const ReactDOMServer = require("react-dom/server");
const React = require("react");

read.readBookmarks("../bookmarks.md", bookmarks => {
  const DOM = ReactDOMServer.renderToStaticMarkup(
    page.render(
      <React.Fragment>
        {bookmarks.map(({ link, title }) => bookmark.render(link, title))}
      </React.Fragment>
    )
  );

  fs.writeFileSync("../static/index.html", DOM);
});

read.readBooks("../readinglist.md", books => {
  const DOM = ReactDOMServer.renderToStaticMarkup(
    page.render(
      <React.Fragment>
        {books.map(({ title, author }) => book.render(title, author))}
      </React.Fragment>
    )
  );

  fs.writeFileSync('../static/readingList.html', DOM);
});

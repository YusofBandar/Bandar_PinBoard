const fs = require('fs');
const es = require('event-stream');


function readBookmarks(filename, callback) {
    let bookmarks = [];

    let bookmarkFound = false;
    let favouriteFound = false
    let title = '';

    fs.createReadStream(filename, {
            flags: 'r'
        })
        .pipe(es.split()) // split by lines
        .pipe(es.map(function (line, next) {

            if (bookmarkFound) {
                let link = line.match(/\(([^)]+)\)/)[1]



                bookmarks.push({
                    title,
                    link,
                    favourite: favouriteFound
                });

                favouriteFound = false;
                bookmarkFound = false;
            } else if (line.startsWith('###')) {
                title = line.split(' ');
                title.shift(1);
                title = title.join(" ")

                bookmarkFound = true;

                if (line.indexOf('*') > -1) {
                    favouriteFound = true;
                }
            }
            next(null, line);
        })).pipe(es.wait(function (err, body) {
            callback(bookmarks)
        }));
}

function readBooks(filename, callback) {
    let books = [];

    let bookFound = false;
    let title = '';

    fs.createReadStream(filename, {
            flags: 'r'
        })
        .pipe(es.split()) // split by lines
        .pipe(es.map(function (line, next) {

            if (bookFound) {

                books.push({
                    title,
                    author: line,
                });

                bookFound = false;
            } else if (line.startsWith('###')) {
                title = line.split(' ');
                title.shift(1);
                title = title.join(" ")

                bookFound = true;

            }
            next(null, line);
        })).pipe(es.wait(function (err, body) {
            callback(books)
        }));
}

function generateReadingPage(books) {
    fs.writeFileSync('../static/readingList.html', generateReadingDom(books));
}


function generateIndexPage(bookmarks) {
    fs.writeFileSync('../static/index.html', generateIndexDom(bookmarks));
}

function generateFavouritePage(bookmarks) {
    let favouriteBookmarks = bookmarks.filter(bookmark => bookmark.favourite);
    fs.writeFileSync('../static/favourite.html', generateIndexDom(favouriteBookmarks));
}



function generateReadingDom(books) {
    let contentDom = ``

    books.forEach(book => {
        let bookDom =
        `
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink">${book.title}</a>
            </div>
            <a class="bookmarkURI">${book.author}</a>
        </div>

        `

        contentDom += bookDom;
    });

    return generateFinalPage(contentDom);
}

function generateIndexDom(bookmarks) {

    let contentDom = ``

    bookmarks.forEach(bookmark => {
        let bookmarkDom =
            `
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink" target="_blank" href="${bookmark.link}">${bookmark.title}</a>
            </div>
            <a class="bookmarkURI" target="_blank" href="${bookmark.link}">${bookmark.link}</a>
        </div>

        `

        contentDom += bookmarkDom;
    });

    return generateFinalPage(contentDom);

}

function generateFinalPage(content) {
    let dom = `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bandars Bookmarks</title>

    <link rel="stylesheet" type="text/css" href="./styling.css">

    <body>
    <div class="top-bar">
        <div class="title">
            <h1 class="header">Bandar's Bookmarks</h1>
            <svg height="32" class="github-mark" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                <a href="https://github.com/YusofBandar/Bandar_PinBoard" target="_blank">
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                </a>
            </svg>
        </div>
        <span class="navigation"><a href="./index.html">Index</a> <a href="./favourite.html">Favourite</a> <a href="./readingList.html">Reading</a></span>
    </div>
        <div class="content inline">
            ${content}
        </div>

    </body>
    </head>`

    return dom
}





readBookmarks('../bookmarks.md', function (bookmarks) {
    generateIndexPage(bookmarks)
    generateFavouritePage(bookmarks)
})

readBooks('../readinglist.md', function (books) {
    generateReadingPage(books);
})
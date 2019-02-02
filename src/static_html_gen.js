const fs = require('fs');
const es = require('event-stream');


function readBookmarks(filename, callback) {
    let bookmarks = [];

    let bookmarkfound = false;
    let title = '';

    fs.createReadStream(filename, {
            flags: 'r'
        })
        .pipe(es.split()) // split by lines
        .pipe(es.map(function (line, next) {

            if (bookmarkfound) {
                let link = line.match(/\(([^)]+)\)/)[1]
                bookmarks.push({
                    title,
                    link
                });
                bookmarkfound = false;
            } else if (line.startsWith('###')) {
                title = line.split(' ');
                title.shift(1);
                title = title.join(" ")
                bookmarkfound = true;
            }



            next(null, line);
        })).pipe(es.wait(function (err, body) {
            callback(bookmarks)
        }));

}

function generateDom(bookmarks) {

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

    let dom = `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bandars Bookmarks</title>

    <link rel="stylesheet" type="text/css" href="./styling.css">

    <body>
        <div class="top-bar">
            <h1 class="title">Bandar's Bookmarks</h1>
        </div>
        <div class="content inline">
            ${contentDom}
        </div>

    </body>
    </head>`

    return dom
}

function writeIndex(filename,content){
    fs.writeFileSync(filename,content);
}


readBookmarks('../bookmarks.md', function (bookmarks) {
    writeIndex('../static/index.html',generateDom(bookmarks))
})
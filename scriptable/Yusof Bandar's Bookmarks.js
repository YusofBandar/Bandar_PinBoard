// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: bookmark;

function generateBookmarksDom(bookmarks){

  let contentDOM = '';
  
  bookmarks.forEach((bookmark) => {
    let bookmarkDOM =
        `
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink" target="_blank" href="${bookmark.link}">${bookmark.title}</a>
            </div>
            <a class="bookmarkURI" target="_blank" href="${bookmark.link}"  title="${bookmark.link}">${bookmark.link.length > 123 ? bookmark.link.slice(0,123) + '...' : bookmark.link}</a>
        </div>
        `

        contentDOM += bookmarkDOM;
  })
  
  return contentDOM;
}

async function writeChanges(indexPage64){
  const baseURL = "working-copy://x-callback-url/write"
  let url = new CallbackURL(baseURL)

  url.addParameter("key", "JB4WSD79TV");
  url.addParameter("repo", "Bandar_PinBoard");
  url.addParameter("path", "static/index.html");
  url.addParameter("base64", indexPage64);
  url.addParameter("clipboard","no");
  
  let result = await url.open();
  return result

}

async function commitChanges(message){
  const baseURL = "working-copy://x-callback-url/commit"
  let url = new CallbackURL(baseURL)

  url.addParameter("key", "JB4WSD79TV");
  url.addParameter("repo", "Bandar_PinBoard");
  url.addParameter("limit", "50");
  url.addParameter("message", message);
  
  let result = await url.open();
  return result
}

async function pushChangesOrigin(){
  const baseURL = "working-copy://x-callback-url/push"
  let url = new CallbackURL(baseURL)

  url.addParameter("key", "JB4WSD79TV");
  url.addParameter("repo", "Bandar_PinBoard");
  
  let result = await url.open();
  return result
}

async function changesToServer(indexPage64){
  await writeChanges(indexPage64);
  await commitChanges('new bookmark added');
  await pushChangesOrigin();
}

async function readingBookmarks(){
  const baseURL = "working-copy://x-callback-url/read"
  let url = new CallbackURL(baseURL)

  url.addParameter("key", "JB4WSD79TV");
  url.addParameter("repo", "Bandar_PinBoard");
  url.addParameter("type", "auto");
  url.addParameter("path", "bookmarks.md");
  url.addParameter("clipboard","no");
  
  let result = await url.open();
  result = result.text;
  result = result.split('---'); 
  
  let bookmarks = [];
  
  const titleReg = /#{3} .{1,}/;  
  result.forEach((log) => {
    let title = log.match(titleReg)[0] || 'no title';
  
    title = title.trim().replace(/#/g,'');
    const fav = title[title.length-1] === '*';
    title = title.trim().replace(/\*/g,'');
  
    let url = log.match(/\(.*?\)/)[0] || 'no url found';
    url = url.replace(/\(|\)/g,'');
  
    bookmarks.push({
      title: title,
      link: url,
      fav: fav
    })
  
  })
  
  return bookmarks;
}

let bookmarks = await readingBookmarks();
let bookmarksDOM = generateBookmarksDom(bookmarks);

let finalPageDOM = generateFinalPage(bookmarksDOM);
await changesToServer(btoa(finalPageDOM));

Script.complete()












function generateFinalPage(content){

    let dom = `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="description" content="A collection of public Yusof Bandar's bookmarks">
    <meta name="keywords" content="Yusof,Bandar,Bookmarks,Public,YusofBandar">
    <meta name="author" content="Yusof Bandar">
    <meta name="google-site-verification" content="cQv6BQltkNiw5IImCn5aUZzECJV-NW9L-VEyl81-q8E" />

    <title>Yusof Bandar's Bookmarks</title>
    
    <link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png">
    <link rel="manifest" href="./images/favicon/site.webmanifest">
    <link rel="mask-icon" href="./images/favicon/safari-pinned-tab.svg" color="#8b7e7e">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    
    <link rel="stylesheet" type="text/css" href="./styling.css">

    <body>
    <div class="top-bar">
        <div class="title">
            <a href="./index.html"> <img class="logo" src="images/logo.png" alt="Green Book Logo"></a>
            <h1 class="header">Yusof Bandar's Bookmarks</h1>
            <button class="clear-button github-logo" aria-label="Github logo linking to the github repo" alt="Github logo">
                <a href="https://github.com/YusofBandar/Bandar_PinBoard" target="_blank">
                    <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </a>
            </button>
            <button class="clear-button edit-logo" aria-label="Pencil icon linking to the bookmarks markdown file" alt="Pencil">
                <a href="https://github.com/YusofBandar/Bandar_PinBoard/edit/master/bookmarks.md" target="_blank">
                    <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                        <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path>
                    </svg>
                </a>
            </button>
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

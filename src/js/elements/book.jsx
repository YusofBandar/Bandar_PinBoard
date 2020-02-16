const render = (title, author) => {
    return (
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink">{book.title}</a>
            </div>
            <a class="bookmarkURI">{book.author}</a>
        </div>
        );
}

exports.render = render;
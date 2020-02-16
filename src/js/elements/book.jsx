const React = require("react")
const render = (title, author) => {
    return (
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink">{title}</a>
            </div>
            <a class="bookmarkURI">{author}</a>
        </div>
        );
}

exports.render = render;
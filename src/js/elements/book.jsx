const React = require("react")
const render = (title, author) => {
    return (
        <div className="bookmark">
            <div className="bookmarkTitle">
                <a className="bookmarkTitleLink">{title}</a>
            </div>
            <a className="bookmarkURI">{author}</a>
        </div>
        );
}

exports.render = render;
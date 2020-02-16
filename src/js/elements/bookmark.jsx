const React = require("react")
const render = (link, title) => {
    return (
        <div className="bookmark">
            <div className="bookmarkTitle">
                <a className="bookmarkTitleLink" target="_blank" href={link}>{title}</a>
            </div>
            <a className="bookmarkURI" target="_blank" href={link}  title={link}>{link.length > 123 ? link.slice(0,123) + '...' : link}</a>
        </div>
        );
}

exports.render = render;
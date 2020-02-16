const render = (link, title) => {
    return (
        <div class="bookmark">
            <div class="bookmarkTitle">
                <a class="bookmarkTitleLink" target="_blank" href={link}>{title}</a>
            </div>
            <a class="bookmarkURI" target="_blank" href={link}  title={link}>{link.length > 123 ? link.slice(0,123) + '...' : link}</a>
        </div>
        );
}

exports.render = render;
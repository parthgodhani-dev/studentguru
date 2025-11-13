import React from "react";

const Headtitle = ({
    className,
    topTitle,
    title,
    headingTag = "h2",
    headingClass = "maintitle",
    underline = false,
    underlineClass = "underline",
    underlineText = null,
    subTitle,
    children
}) => {
    const renderTitleContent = () => {
        if (!title) return null;

        if (underline && underlineText && title.includes(underlineText)) {
            const parts = title.split(underlineText);
            return parts.map((part, idx) => (
                <React.Fragment key={idx}>
                    {part}
                    {idx !== parts.length - 1 && (
                        <span className={underlineClass}>{underlineText}</span>
                    )}
                </React.Fragment>
            ));
        }

        return title;
    };

    return (
        <>
        <div className={`headtitle ${className || ""}`}>
            {topTitle && <em>{topTitle}</em>}

            {children ? (
                children
            ) : (
                React.createElement(
                    headingTag,
                    { className: headingClass },
                    renderTitleContent()
                )
            )}

            {subTitle && <p>{subTitle}</p>}
        </div>
        </> 
    );
};

export default Headtitle;

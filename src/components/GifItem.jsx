export const GifItem = ({ id, url, title }) => {
    return (
        <div className="card">
            <p key={id}>{title}</p>
            <img key={id} src={url} alt={title} />
        </div>
    )
}
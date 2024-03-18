import PropTypes from 'prop-types';

export const GifItem = ({ id, url, title }) => {
    return (
        <div className="card">
            <p key={id}>{title}</p>
            <img key={id} src={url} alt={title} />
        </div>
    )
}

GifItem.propTypes = {
    id: PropTypes.string,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
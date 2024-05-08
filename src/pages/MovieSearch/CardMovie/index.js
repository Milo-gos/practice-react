import './index.scss';
function CardMovie({ movie }) {
    return (
        <div className="card-movie">
            <h3>{movie.title}</h3>
            <div className="image-wrapper">
                {movie.imgPath ? (
                    <img
                        src={`http://image.tmdb.org/t/p/w500${movie.imgPath}`}
                    />
                ) : (
                    <span>NO IMAGE</span>
                )}
            </div>
        </div>
    );
}

export default CardMovie;

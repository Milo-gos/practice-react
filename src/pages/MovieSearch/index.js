import { useState } from 'react';
import './index.scss';
import CardMovie from './CardMovie';
import axios from 'axios';

function MovieSearchPage() {
    const [searchString, setSearchString] = useState('');
    const [listMovies, setListMoives] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const handleKeyDownInput = (e) => {
        if (e.key === 'Enter') handleClickSearch();
    };

    const handleClickSearch = () => {
        (async function () {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchString.trim()}`
                );
                const listMoviesReturn = response.data.results.map((movie) => {
                    return {
                        title: movie.title,
                        imgPath: movie.poster_path,
                    };
                });
                setListMoives(listMoviesReturn);
                if (errorMessage) setErrorMessage('');
            } catch (error) {
                if (error.response.status === 401) {
                    setErrorMessage('Lỗi API Key');
                }
            }
        })();
    };
    return (
        <div className="container-movie-search">
            <h2>Moive search page</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                />
                <button onClick={handleClickSearch}>Search</button>
            </div>
            {errorMessage && (
                <span
                    style={{
                        color: 'red',
                        marginTop: '8px',
                        display: 'block',
                    }}
                >
                    {errorMessage}
                </span>
            )}

            <div className="list-movies">
                {listMovies.map((movie, index) => {
                    return (
                        <CardMovie
                            key={index}
                            movie={movie}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MovieSearchPage;

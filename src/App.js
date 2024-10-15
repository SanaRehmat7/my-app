import React, { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './MovieCard.jsx';



const API_URL = "http://www.omdbapi.com?apikey=5cfd1fe8";

const movie = [
    {
        Title: "Superman, Spiderman or Batman",
        Year: "2011",
        imdbID: "tt2084949",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
    }
];

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);  // Uncomment to see the fetched data in console.log()

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                console.error('Error:', data.Error);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    useEffect(() => {
        searchMovies('Batman');  
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search Movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies.length > 0 ? 
            
                (
                    <div className="container">
                        {movies.map((movie) => (
                        <MovieCard movie={movie} />
                        ))}
                        
                    </div>

                        
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;



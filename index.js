document.addEventListener("DOMContentLoaded", function () {
    const filmsList = document.getElementById("films");
    const movieDetails = document.getElementById("movie-details");
    const baseUrl = "http://localhost:3000"; 

    // Function to make a GET request to the JSON DB server
    function fetchMovieData(url) {
        return fetch(url)
        .then(response => response.json());
    }

    // Function to populate the movie menu with cards
    function populateMovieMenu(movies) {
        filmsList.innerHTML = "";
        movies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML = `
                <img class="movie-image" src="${movie.poster}" alt="${movie.title} Poster">
                <h2 class="movie-title">${movie.title}</h2>
            `;
            card.addEventListener("click", () => showMovieDetails(movie.id));
            filmsList.appendChild(card);
        });
    }

    // Function to display movie details
    function showMovieDetails(movieId) {
        const movieUrl = `${baseUrl}/films/${movieId}`;
        fetchMovieData(movieUrl)
        .then(movie => {
            const availableTickets = movie.capacity - movie.tickets_sold;
            movieDetails.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title} Poster">
                <h2>${movie.title}</h2>
                <p>Runtime: ${movie.runtime} minutes</p>
                <p>Showtime: ${movie.showtime}</p>
                <p>Available Tickets: ${availableTickets}</p>
                <p>Description: ${movie.description}</p>
                <button onclick="buyTicket(${movieId}, ${availableTickets})">Buy Ticket</button>
            `;
        });
    }

    // Function to handle "Buy Ticket" button click
    function buyTicket(movieId, availableTickets) {
        if (availableTickets > 0) {
            // we'll just display a message
            alert("Ticket purchased successfully!");
            // Update the available tickets on the frontend
            const ticketElement = movieDetails.querySelector("p:last-child");
            ticketElement.textContent = `Available Tickets: ${availableTickets - 1}`;
        } else {
            alert("Sorry, this movie is sold out.");
        }
    }

    // Function to initialize the app
    function init() {
        const moviesUrl = `${baseUrl}/films`;
        fetchMovieData(moviesUrl).then(populateMovieMenu);
        // Show details of the first movie initially
        showMovieDetails(1); 
    }

    init();
});

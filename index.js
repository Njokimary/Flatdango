// Function to make a GET request to the JSON DB server
function fetchMovieData(url) {
    return fetch(url)
        .then(response => response.json());
}

// Function to handle "Buy Ticket" button click
function buyTicket(movieId, availableTickets) {
    if (availableTickets > 0) {
        // we'll just display a message
        alert("Ticket purchased successfully!");
        // Simulate ticket purchase by decrementing tickets_sold 
        const movieCard = document.getElementById(`movie-${movieId}`);
        const ticketElement = movieCard.querySelector(".movie-available-tickets");
        ticketElement.textContent = `Available Tickets: ${availableTickets - 1}`;
    } else {
        alert("Sorry, this movie is sold out.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const filmsList = document.getElementById("films");
    const movieDetails = document.getElementById("movie-details");
    const baseUrl = "http://localhost:3000";

    // Function to populate the movie menu with cards
    function populateMovieMenu(movies) {
        filmsList.innerHTML = "";
        movies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML = `
                <img class="movie-image" src="${movie.poster}" alt="${movie.title} Poster">
                <h2 class="movie-title">${movie.title}</h2>
                <div class="movie-details-container">
                    <p class="movie-runtime">Runtime: ${movie.runtime} minutes</p>
                    <p class="movie-showtime">Showtime: ${movie.showtime}</p>
                    <p class="movie-available-tickets">Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
                    <p class="movie-description">${movie.description}</p>
                    <button class="buy-ticket-btn" onclick="buyTicket(${movie.id}, ${movie.capacity - movie.tickets_sold})">Buy Ticket</button>
                </div>
            `;
            filmsList.appendChild(card);
        });
    }

    // Function to display movie details
    function showMovieDetails(movieId) {
        const movieUrl = `${baseUrl}/films/${movieId}`;
        fetchMovieData(movieUrl)
            .then(movie => {
                const movieCard = document.getElementById(`movie-${movieId}`);
                movieCard.querySelector(".movie-description").textContent = movie.description;
                const availableTickets = movie.capacity - movie.tickets_sold;
                if (availableTickets > 0) {
                    movieCard.querySelector(".buy-ticket-btn").style.display = "block";
                } else {
                    movieCard.querySelector(".buy-ticket-btn").style.display = "none";
                }
            });
    }

    // Function to initialize the app
    function init() {
        const moviesUrl = `${baseUrl}/films`;
        fetchMovieData(moviesUrl).then(populateMovieMenu);
    }

    init();
});

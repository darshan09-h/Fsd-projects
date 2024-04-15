// Get references to HTML elements
const movieNameRef = document.getElementById("movieName"); // Reference to input field for movie name
const searchBtn = document.getElementById("searchBtn"); // Reference to search button
const result = document.getElementById("result"); // Reference to container for displaying movie details

// API key for OMDB API
const key = "5f982077";

// Function to fetch movie data from OMDB API
const getMovie = () => {
  // Retrieve movie name from input field
  const movieName = movieNameRef.value;
  
  // Construct URL for API request
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  
  // Check if the movie name is not empty
  if (movieName.length <= 0) {
    // If empty, display a message in the result container
    result.innerHTML = `<h3 class="msg"></h3>`;
  } else {
    // If not empty, fetch data from the API
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // Check if the response from the API is successful
        if (data.Response == "True") {
          // If successful, display movie details in the result container
          result.innerHTML = `
            <div class="info smaller-info">
                <img src="${data.Poster}" class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <h4>IMDB Rating:</h4>
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}/10</h4>
                    </div>
                    <div class="details">
                        <span>${data.Type}</span>
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                  </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            <h3>Director & Writer</h3>
            <p>${data.Director},${data.Writer}</p>
        `;
          // Add animation class to the result container
          result.classList.add('animated');
        } else {
          // If API response is not successful, display an error message
          result.innerHTML = `<h3 class="msg">Enter Valid Movie Name</h3>`;
        }
      });
  }
};

// Function to handle Enter key press event
const handleEnterKey = (event) => {
  // Check if Enter key is pressed
  if (event.key === "Enter") {
    // If Enter key is pressed, call getMovie function
    getMovie();
  }
};

// Event listeners
searchBtn.addEventListener("click", getMovie); // Trigger getMovie function when search button is clicked
window.addEventListener("load", getMovie); // Trigger getMovie function when the window is loaded
movieNameRef.addEventListener("keypress", handleEnterKey); // Trigger handleEnterKey function when a key is pressed in the movie name input field

// Get reference to copy email button
const copyEmailBtn = document.getElementById("copyEmailBtn");

// Function to copy email address to clipboard
const copyEmailToClipboard = () => {
  // Email address to be copied
  const email = "darshan090704@email.com"; // Replace with your email address
  
  // Write email address to clipboard
  navigator.clipboard.writeText(email)
    .then(() => {
      // Show alert message if email is copied successfully
      alert("Email copied to clipboard!");
    })
    .catch((error) => {
      // Show error message if copying fails
      console.error("Unable to copy email: ", error);
      alert("Failed to copy email. Please try again.");
    });
};

// Event listener to trigger copyEmailToClipboard function when copy email button is clicked
copyEmailBtn.addEventListener("click", copyEmailToClipboard);

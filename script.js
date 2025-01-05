const API_URL = "https://nodayz.onrender.com/requests"; // Replace with your deployed backend URL

// DOM Elements
const liveRequestBtn = document.getElementById("liveRequestBtn");
const requestBox = document.getElementById("requestBox");
const requestForm = document.getElementById("requestForm");
const requestsDisplay = document.getElementById("requestsDisplay");
const duplicateMessage = document.getElementById("duplicateMessage");


// Show request form when button is clicked
liveRequestBtn.addEventListener("click", () => {
  liveRequestBtn.classList.add("hidden");
  requestBox.classList.remove("hidden");
});

// Fetch and display existing requests
async function fetchRequests() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch requests");
    }

    const requests = await response.json();

    // Clear and populate the request display
    requestsDisplay.innerHTML = "";
    requests.forEach(({ _id, name, request }) => {
      const requestItem = document.createElement("div");
      requestItem.className = "request-item";
      requestItem.setAttribute("data-id", _id); // Store the request ID for deletion
      requestItem.innerHTML = `
        <strong>${name || "User"}:</strong> ${request}
      `;
      
      // Add long-press event listener for deletion
      addLongPressListener(requestItem, _id);

      requestsDisplay.appendChild(requestItem);
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
  }
}

// Load requests on page load
fetchRequests();

// Handle form submission
requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const musicRequest = document.getElementById("musicRequest").value.trim();
  const userName = document.getElementById("userName").value.trim() || "User";

  if (!musicRequest) {
    alert("Please enter a music request!");
    return;
  }

  try {
    // Check for duplicates
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch requests");
    }

    const requests = await response.json();
    const duplicate = requests.some(
      (req) => req.request.toLowerCase() === musicRequest.toLowerCase()
    );

    if (duplicate) {
      duplicateMessage.classList.remove("hidden");
      setTimeout(() => duplicateMessage.classList.add("hidden"), 3000); // Hide after 3 seconds
      return;
    }

    // Post new request
    const newRequest = { name: userName, request: musicRequest };
    const postResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to post new request");
    }

    // Clear form fields
    document.getElementById("musicRequest").value = "";
    document.getElementById("userName").value = "";

    // Refresh the display with the updated list of requests
    fetchRequests();
  } catch (error) {
    console.error("Error posting request:", error);
  }
});

// Add long-press functionality to delete a request
function addLongPressListener(element, requestId) {
  let pressTimer;

  // Start timer on mouse down or touch start
  const startPress = () => {
    pressTimer = setTimeout(async () => {
      try {
        const deleteResponse = await fetch(`${API_URL}/${requestId}`, {
          method: "DELETE",
        });

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete request");
        }

        // Refresh the display with the updated list of requests
        fetchRequests();
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }, 5000); // 5 seconds for long press
  };

  // Clear timer on mouse up, touch end, or leave
  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  element.addEventListener("mousedown", startPress);
  element.addEventListener("touchstart", startPress);
  element.addEventListener("mouseup", cancelPress);
  element.addEventListener("touchend", cancelPress);
  element.addEventListener("mouseleave", cancelPress);
}

// Periodically refresh requests to reflect auto-deletion (optional, every 1 min)
setInterval(fetchRequests, 60000);


// Function to display content dynamically when a genre is clicked
function loadGenreContent(container, genreName, type) {
  // Clear existing content
  container.innerHTML = "";

  // Define folder path dynamically (modify if needed)
  const folderPath = `ngomaz/${genreName.toLowerCase().replace(/\s|&|,/g, "_")}`;

  if (type === "video") {
    // Fetch video files (replace with a backend API for dynamic data if needed)
    fetch(`${folderPath}/videos.json`)
      .then((response) => response.json())
      .then((videos) => {
        if (videos.length === 0) {
          container.innerHTML = "<p>No videos available in this genre.</p>";
          return;
        }

        videos.forEach((video) => {
          const videoItem = document.createElement("div");
          videoItem.textContent = video.replace(/\.[^/.]+$/, ""); // Remove file extension
          videoItem.style.cursor = "pointer";
          videoItem.style.padding = "5px";
          videoItem.style.borderBottom = "1px solid #ccc";

          videoItem.addEventListener("click", () => {
            playVideo(`${folderPath}/${video}`);
          });

          container.appendChild(videoItem);
        });
      })
      .catch(() => {
        container.innerHTML = `<p>Error loading videos from ${folderPath}</p>`;
      });
  } else {
    // Fetch tracks (simulate with dummy data if no backend)
    const trackList = [
      `Song 1 - Artist A`,
      `Song 2 - Artist B`,
      `Song 3 - Artist C`,
      `Song 4 - Artist D`,
    ]; // Replace this with a dynamic fetch if needed

    const ul = document.createElement("ul");
    ul.style.maxHeight = "300px";
    ul.style.overflowY = "auto";

    trackList.forEach((track) => {
      const li = document.createElement("li");
      li.textContent = track;
      li.style.padding = "5px";
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }
}

// Function to handle navigation and display the correct genre content
function setupGenreNavigation() {
  const genres = document.querySelectorAll(".genres ul li");
  const tracksContainer = document.querySelector(".tracks");
  const videoButton = document.querySelector(".video-list-btn");

  genres.forEach((genre) => {
    genre.addEventListener("click", () => {
      const genreName = genre.textContent;

      // Load track list by default
      loadGenreContent(tracksContainer, genreName, "track");

      // Update the video button functionality
      videoButton.addEventListener("click", () => {
        loadGenreContent(tracksContainer, genreName, "video");
      });
    });
  });
}

// Function to play video in a popup player
function playVideo(videoPath) {
  // Remove existing video player if present
  const existingPlayer = document.getElementById("video-player");
  if (existingPlayer) {
    existingPlayer.remove();
  }

  // Create video player container
  const videoPlayer = document.createElement("div");
  videoPlayer.id = "video-player";
  videoPlayer.style.position = "fixed";
  videoPlayer.style.top = "50%";
  videoPlayer.style.left = "50%";
  videoPlayer.style.transform = "translate(-50%, -50%)";
  videoPlayer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  videoPlayer.style.padding = "20px";
  videoPlayer.style.borderRadius = "10px";
  videoPlayer.style.zIndex = "1000";

  // Video element
  const video = document.createElement("video");
  video.src = videoPath;
  video.controls = true;
  video.autoplay = true;
  video.style.width = "100%";

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "red";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.padding = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", () => {
    videoPlayer.remove();
  });

  // Auto-close when video ends
  video.addEventListener("ended", () => {
    videoPlayer.remove();
  });

  videoPlayer.appendChild(video);
  videoPlayer.appendChild(closeButton);
  document.body.appendChild(videoPlayer);
}

// Back button functionality
function goBack() {
  document.querySelectorAll(".content-page").forEach((page) => {
    page.style.display = "none";
  });
  document.getElementById("home-page").style.display = "block";
}

// Setup page navigation
function setupPageNavigation() {
  const buttons = document.querySelectorAll(".center-buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id;
      document.getElementById("home-page").style.display = "none";

      // Display the selected content page
      const selectedPage = document.getElementById(`${id}-page`);
      if (selectedPage) {
        selectedPage.style.display = "block";
      }
    });
  });
}

// Initialize the website functionality
function initialize() {
  setupPageNavigation();
  setupGenreNavigation();
}

initialize();
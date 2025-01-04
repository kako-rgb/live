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


// Helper function to create video player
function createVideoPlayer(videoPath) {
  // Check if a player already exists and remove it
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
  videoPlayer.style.zIndex = "1000";
  videoPlayer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  videoPlayer.style.padding = "20px";
  videoPlayer.style.borderRadius = "10px";
  videoPlayer.style.width = "50%";

  // Create video element
  const video = document.createElement("video");
  video.src = videoPath;
  video.controls = true;
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
  closeButton.addEventListener("click", () => videoPlayer.remove());

  // Auto-close when video ends
  video.addEventListener("ended", () => videoPlayer.remove());

  videoPlayer.appendChild(video);
  videoPlayer.appendChild(closeButton);
  document.body.appendChild(videoPlayer);
}

// Load genres and video files dynamically
function loadGenres(container, folderPath, type = "tracks") {
  // Clear existing content
  container.innerHTML = "";

  // Genre names
  const genres = [
    "arabic",
    "chinese",
    "dancehall, Ragga, Riddims",
    "East African",
    "gospel",
    "international",
    "lingala & rhumba",
    "traditional",
    "west & south Africa",
    "X-mass",
  ];

  genres.forEach((genre) => {
    // Create genre item
    const genreItem = document.createElement("div");
    genreItem.textContent = genre;
    genreItem.style.cursor = "pointer";
    genreItem.style.padding = "10px";
    genreItem.style.borderBottom = "1px solid white";

    // Handle genre click
    genreItem.addEventListener("click", () => {
      if (type === "tracks") {
        // Display dummy song list
        const songList = document.createElement("ul");
        songList.style.maxHeight = "300px";
        songList.style.overflowY = "scroll";

        for (let i = 1; i <= 15; i++) {
          const songItem = document.createElement("li");
          songItem.textContent = `Track ${i} - Artist ${i}`;
          songList.appendChild(songItem);
        }

        container.innerHTML = ""; // Clear container and add songs
        container.appendChild(songList);
      } else if (type === "videos") {
        // Display video list
        fetch(`${folderPath}/${genre}`)
          .then((response) => response.json())
          .then((videoFiles) => {
            container.innerHTML = ""; // Clear container

            videoFiles.forEach((file) => {
              const videoItem = document.createElement("div");
              videoItem.textContent = file.replace(/\.[^/.]+$/, ""); // Remove file extension
              videoItem.style.cursor = "pointer";
              videoItem.style.padding = "5px";
              videoItem.addEventListener("click", () =>
                createVideoPlayer(`${folderPath}/${genre}/${file}`)
              );
              container.appendChild(videoItem);
            });
          })
          .catch(() =>
            console.error(`Could not load videos from ${folderPath}/${genre}`)
          );
      }
    });

    container.appendChild(genreItem);
  });
}

// Handle navigation between pages
document.querySelectorAll(".center-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.id;

    // Hide the home page
    document.getElementById("home-page").style.display = "none";

    // Show respective content page
    document.getElementById(`${id}-page`).style.display = "block";

    if (id === "out-list" || id === "saxs") {
      const container = document.querySelector(`#${id}-page .tracks`);
      loadGenres(container, "ngomaz", "tracks");
    } else if (id === "mixxez") {
      const container = document.querySelector(`#${id}-page .tracks`);
      loadGenres(container, "ngomaz", "videos");
    }
  });
});

// Back button functionality
function goBack() {
  document.querySelectorAll(".content-page").forEach((page) => {
    page.style.display = "none";
  });
  document.getElementById("home-page").style.display = "block";
}


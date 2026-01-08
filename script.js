const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const titleEl = document.getElementById("song-title");
const genreSelect = document.getElementById("genreSelect");

let allSongs = [];
let currentSongs = [];
let currentIndex = 0;

// Load playlist
fetch("playlist.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    loadGenres();
    filterSongs("all");
  });

// Load genre dropdown
function loadGenres() {
  const genres = [...new Set(allSongs.map(s => s.genre))];
  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    genreSelect.appendChild(option);
  });
}

// Khi đổi thể loại
genreSelect.addEventListener("change", () => {
  filterSongs(genreSelect.value);
});

function filterSongs(genre) {
  currentSongs = genre === "all"
    ? allSongs
    : allSongs.filter(s => s.genre === genre);

  renderPlaylist();
  currentIndex = 0;
}

// Hiển thị playlist
function renderPlaylist() {
  playlistEl.innerHTML = "";
  currentSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => playSong(index);
    playlistEl.appendChild(li);
  });
}

// Phát nhạc
function playSong(index) {
  currentIndex = index;
  const song = currentSongs[index];

  audio.src = song.src;
  titleEl.textContent = `${song.title} - ${song.artist}`;
  audio.play();

  document.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  playlistEl.children[index].classList.add("active");
}

// Auto next khi hết bài
audio.addEventListener("ended", () => {
  const mode = document.querySelector('input[name="playMode"]:checked').value;

  if (mode === "order") {
    currentIndex++;
    if (currentIndex < currentSongs.length) {
      playSong(currentIndex);
    }
  }
});

const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const titleEl = document.getElementById("song-title");

fetch("playlist.json")
  .then(res => res.json())
  .then(songs => {
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist}`;
      li.onclick = () => playSong(song);
      playlistEl.appendChild(li);
    });
  });

function playSong(song) {
  audio.src = song.src;
  titleEl.textContent = song.title;
  audio.play();
}

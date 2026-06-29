const audio = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
const statusMessage = document.getElementById("statusMessage");

let tracks = [];
let currentIndex = -1;

function setStatus(message) {
  statusMessage.textContent = message;
}

function resolveAssetUrl(path) {
  return new URL(path, window.location.href).href;
}

function renderPlaylist() {
  playlistEl.innerHTML = "";

  tracks.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.className = "song-btn";
    button.type = "button";
    button.innerHTML = `${track.title}<span class="song-meta">${track.ministry || "Alabanza"}</span>`;

    if (index === currentIndex) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => playTrack(index));

    item.appendChild(button);
    playlistEl.appendChild(item);
  });
}

function playTrack(index) {
  const track = tracks[index];
  if (!track) {
    return;
  }

  currentIndex = index;
  audio.src = resolveAssetUrl(track.file);
  audio.play().catch(() => {
    setStatus("Selecciona una cancion para comenzar.");
  });

  setStatus(`Reproduciendo: ${track.title}`);
  renderPlaylist();
}

audio.addEventListener("ended", () => {
  const nextIndex = currentIndex + 1;
  if (nextIndex < tracks.length) {
    playTrack(nextIndex);
  }
});

async function loadPlaylist() {
  try {
    const playlistUrl = resolveAssetUrl("media/playlist.json");
    const response = await fetch(playlistUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar playlist.json (${response.status})`);
    }

    const data = await response.json();
    tracks = Array.isArray(data.tracks) ? data.tracks : [];

    if (!tracks.length) {
      setStatus("No hay canciones aun. Agrega archivos de audio a /media y actualiza playlist.json.");
      return;
    }

    setStatus("Elige una cancion de la lista.");
    renderPlaylist();
  } catch (error) {
    if (window.location.protocol === "file:") {
      setStatus("Abre este proyecto con un servidor local (no file://) para cargar la playlist.");
      return;
    }

    setStatus("No se encontro playlist.json o hubo un error de carga.");
  }
}

loadPlaylist();

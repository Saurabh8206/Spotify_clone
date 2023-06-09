console.log("Welcome to Spotify");

let songindex = 0;
let audioElement = new Audio("../mp3/kasoor01.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("myProgressbar");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Kasoor",
    filePath: "../mp3/kasoor01.mp3",
    coverpath: "../image/kasoor.jpg",
  },
  {
    songName: "Kho Gaye\n Hum Kaha",
    filePath: "../mp3/khogayehum02.mp3",
    coverpath: "../image/cover1.jpg",
  },
  {
    songName: "Tum Jab \n pass",
    filePath: "../mp3/tumjabpass03.mp3",
    coverpath: "../image/tumabpass.jpg",
  },
  {
    songName: "Raat Raazi",
    filePath: "../mp3/RaatRaazi.mp3",
    coverpath: "../image/raatrazi.jpg",
  },
  {
    songName: "Tere Hi Hum",
    filePath: "../mp3/TereHiHum.mp3",
    coverpath: "../image/terehihum.jpg",
  },
];

songItems.forEach((element, i) => {
  //   console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle Play Pause events
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime < 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

// Listen for events
audioElement.addEventListener("timeupdate", () => {
  // Update seek bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressbar.value = progress;
});

myProgressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressbar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", () => {
      makeAllPlay();

      songindex = parseInt(element.id);
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songindex - 1].songName;
      audioElement.src = songs[i].filePath;
      audioElement.currentTime = 0;
      audioElement.play();

      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

// Previous button logic
document.getElementById("previousBtn").addEventListener("click", () => {
  if (songindex <= 0) {
    songindex = 0;
  } else {
    songindex--;
  }
  audioElement.src = songs[songindex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[songindex].songName;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Next button logic
document.getElementById("nextBtn").addEventListener("click", (i) => {
  if (songindex > songs.length - 1) {
    songindex = 0;
  } else {
    songindex++;
  }

  audioElement.src = songs[songindex].filePath;
  masterSongName.innerText = songs[songindex].songName;

  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

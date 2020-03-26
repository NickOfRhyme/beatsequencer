let currBeatNum = 0;
let beatInterval;
const totalBeats = 4;
const playPauseButton = document.querySelector("button.play");
const drums = document.querySelectorAll("#container > *");

playPauseButton.addEventListener("click", playPauseToggle);
drums.forEach(drum => {
  drum.addEventListener("click", drumChoiceToggle);
});

function startBeat(BPM = 140) {
  beatInterval = setInterval(advanceBeat, (60 / BPM) * 1000);
}

function advanceBeat() {
  if (currBeatNum >= 1) {
    const lastBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);
    lastBeatColumn.forEach(beat => {
      beat.classList.remove("active");
    });
  }

  currBeatNum === totalBeats ? (currBeatNum = 1) : currBeatNum++;

  const currBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);

  currBeatColumn.forEach(beat => {
    beat.classList.add("active");
    if (beat.classList.contains("chosen")) playSound(beat.dataset.drum);
  });
}

function pauseBeat() {
  clearInterval(beatInterval);
}

function stopBeat() {
  pauseBeat();
  const currBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);
  currBeatColumn.forEach(beat => {
    beat.classList.remove("active");
  });
  currBeatNum = 0;
}

function playSound(drumType) {
  console.log(drumType);
  const sound = document.querySelector(`#${drumType}`);
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function drumChoiceToggle({ target: { classList } }) {
  classList.toggle("chosen");
}

function playPauseToggle({ target: { classList } }) {
  if (classList.contains("play")) {
    classList.remove("play");
    classList.add("pause");
    startBeat();
  } else {
    classList.remove("pause");
    classList.add("play");
    stopBeat();
  }
}

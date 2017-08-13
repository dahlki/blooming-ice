import paper from 'paper';
import tones from '../public/music';

const numOfChords = 30;
const numOfRows = 4;
const numOfCols = 8;
let start = false;

////// find audio element by id and play tone //////
const playTone = (id) => {
  const audioNode = document.getElementById(id);
  audioNode.pause();
  audioNode.load();
  return audioNode.play()
  .then(()=> {
    console.log("it's playing");
  })
  .catch((error) => {
    throw new Error(error);
  })
}

const stopTones = () => {
  const sounds = document.getElementsByTagName('audio');
  for(let i=0; i<sounds.length; i++) sounds[i].pause();
}

////// helper function to sort strings by number //////
function _sortByDigits(array) {
  let re = /\D/g;

  array.sort(function(a, b) {
    return(parseInt(a.replace(re, ""), 10) - parseInt(b.replace(re, ""), 10));
  });
  return array;
}

////// create audio elements with ogg tone files //////
const makeAudioEls = () => {
  const tonesAudio = _sortByDigits(Object.keys(tones))
    .map(toneName => {
      let audioEl = new Audio(tones[toneName])
      audioEl.id = `${toneName}`;
      return audioEl;
    }
  );
  const canvasNode = document.getElementsByTagName('canvas')[0];
  tonesAudio.forEach(tone => canvasNode.appendChild(tone));
  return tonesAudio;
}

////// get array of tones as html audio elements/////
const tonesArray = makeAudioEls();

////// get location of node on canvas 'grid' //////
const getCell = (node, viewWidth, viewHeight) => {
  const cellW = viewWidth / numOfCols;
  const cellH = viewHeight / numOfRows;

  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      if( node.x > j * cellW && node.x < j * cellW + cellW && node.y > i * cellH && node.y < i * cellH + cellH ) {
        return {x: j, y: i};
      }
    }
  }
}

// play all tones in sequence:
function playSequence(start) {
  let i = start;

  (function playAllTones() {
    if (i < 33) {
      tonesArray[i - 1].onended = playAllTones

      return function(j) {
        i++;
        console.log(`play ${j}`);
        playTone(`${j}ogg`);
      }(i)
    }
  }())
}

// play a tone on repeat:
function playRepeat(id) {
  const indexOfTone = id.slice(0, -3) - 1;
  tonesArray[indexOfTone].loop = true;
  (function playAllTones() {
    if (start) playTone(id);
  }())
}

////// get random color //////
const getRandomColor = () => {
  const R = Math.random();
  const G = Math.random();
  const B  =Math.random();
  const A = Math.random();
  return new paper.Color(R,G,B,A);
}

////// interval function //////
function setIntervalOnNode(cb, delay, repetitionsOfCb, node) {
  let x = 0;
  start = true;
  const intervalFn = window.setInterval(() => {

    cb(node);

    if (++x === repetitionsOfCb) {
      window.clearInterval(intervalFn);
      start = false;
      stopTones();
      gravity();
    }
  }, delay);
}

function radialLines(nodePosition) {
  const angle = Math.random()* Math.PI * 2;
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle)

  function getStartPoint(center, radius) {
    return {
      x: center.x - cosAngle * (radius + 10),
      y: center.y - sinAngle * (radius + 10)
    };
  }

  function getEndPoint(start, length) {
    return {
      x: start.x - cosAngle * length,
      y: start.y - sinAngle * length
    }
  }
  const startPos = getStartPoint(nodePosition, 30)
  const length = (Math.random() * 20) + 10
  const endPos = getEndPoint(startPos, length)
  const startPoint = new paper.Point(startPos.x, startPos.y)
  const endPoint = new paper.Point(endPos.x, endPos.y)
  const line = new paper.Path.Line(startPoint, endPoint);
  line.strokeWidth = 2;
  return line.strokeColor = getRandomColor();
}

function gravity() {
  const allLines = paper.project.getItems({
    class: paper.Path
  })
  allLines.forEach(line => fall(line))

  function fall(line) {
    const intervalFn = setInterval(() => {
      if (line.position.y > (paper.view.size.height * .97)) {
        clearInterval(intervalFn);
      }
      else line.position.y += (line.length);
    }, 500);
  }
}

function startMusic() {
  start = true;
}
function getStart() {
  return start;
}

module.exports = {
  numOfCols,
  playTone,
  stopTones,
  makeAudioEls,
  getCell,
  playRepeat,
  setIntervalOnNode,
  radialLines,
  startMusic,
  getStart
}

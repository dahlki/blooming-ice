import tones from '../public/music';

const numOfChords = 30;
const numOfRows = 4;
const numOfCols = 8;

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
  console.log('all tones stop');
}

////// helper function to sort strings by number //////
function _sortByDigits(array) {
  var re = /\D/g;

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
  console.log(tonesAudio);
  return tonesAudio;
}

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

module.exports = {
  numOfCols,
  playTone,
  stopTones,
  makeAudioEls,
  getCell
}


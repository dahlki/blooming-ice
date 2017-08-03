/*eslint-disable*/

import paper from 'paper';
import tones from '../public/music';
import { playTone, stopTones, makeAudioEls, numOfCols, getCell } from './utils';

window.onload = () => {

  ////// setup canvas with paper /////
  const canvas = document.getElementById('myCanvas');
  paper.setup(canvas);

  ////// change canvas size when window is resized/////
  const resizeCanvas = window.onresize = (event) => {
    canvas.width = (window.innerWidth * .9);
    canvas.height = (window.innerHeight * .9);
  }
  resizeCanvas();

  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  paper.view.onResize = (event) => {
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
  }

  ////// get array of tones as html audio elements/////
  const tonesArray = makeAudioEls();

  ////// experimenting with playing audio //////

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
  // playSequence(1);

  // play a tone on repeat:
  function playRepeat(id) {
    const indexOfTone = id.slice(0, -3) - 1;
    tonesArray[indexOfTone].loop = true;
    (function playAllTones() {
          console.log('play', id);
          playTone(id);
    }())
  }
  // playRepeat('30ogg')

  ////// create nodes with animated gradient /////
  const nodePositions = [];

  const path = new paper.Path.Circle(
    new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight), 30
  );

  path.fillColor = {
    gradient: {
      stops: [['red', 0.05], ['pink', 0.7], ['rgb(112, 69, 69)', 1], ['rgba(250, 250, 250, 0)', 1]],
      radial: true
    },
    origin: path.position,
    destination: path.bounds.rightCenter
  };
  const gradient = path.fillColor.gradient;
  const pathS = new paper.SymbolDefinition(path);
  path.remove();

  for (let i = 0; i < 2; i++) {
    const position = (new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight));
    const pathI = pathS.place(position);
    nodePositions.push(pathI.position)
  }

  ////// play tones of cells /////
  let cells = nodePositions.map(nodePos => {
    return getCell(nodePos, canvasWidth, canvasHeight)
  })
  cells.forEach(cell => {
    playRepeat(`${cell.y * numOfCols + cell.x + 1}ogg`)
  })
  // let cell = getCell(nodePositions[0], canvasWidth, canvasHeight)
  // console.log(cell);
  // const toneId = `${cell.y * numOfCols + cell.x + 1}ogg`;
  // console.log(toneId);
  // playTone(toneId);

  function radialLines(nodePosition) {
    const angle = Math.random()* Math.PI * 2;

    function getPoint(center, radius) {
      return {
        x: center.x - Math.cos(angle)* (radius+10),
        y: center.y - Math.sin(angle)* (radius+10)
      };
    }
    const point = getPoint(nodePosition, 30)
    const startPoint = new paper.Point(point.x, point.y)
    const endPointX = point.x - (Math.cos(angle) * 20)
    const endPointY = point.y - (Math.sin(angle) * 20)
    const endPoint = new paper.Point(endPointX , endPointY)
    const line = new paper.Path.Line(startPoint, endPoint);
    const R = Math.random();
    const G = Math.random();
    const B  =Math.random();
    const A = Math.random();
    line.strokeColor = new paper.Color(R,G,B,A);
  }

  function setIntervalX(node, cb, delay, repetitions) {
    let x = 0;
    const intervalID = window.setInterval(() => {

      cb(node);

      if (++x === repetitions) {
        window.clearInterval(intervalID);
        stopTones()
      }
    }, delay);
  }
  setIntervalX(nodePositions[0], radialLines, 100, 150);
  setIntervalX(nodePositions[1], radialLines, 100, 150);

  ////// main animation //////
  ////// This function is called each frame of the animation: //////
  paper.view.onFrame = (event) => {
    const whiteStop = gradient.stops[2];
    // Animate the offset between 0.7 and 0.9:
    whiteStop.offset = Math.sin(event.time * 5) * 0.1 + 0.8;
    // Animate the offset between 0.2 and 0.4
    const pinkStop = gradient.stops[1];
    pinkStop.offset = Math.sin(event.time * 3) * 0.1 + 0.3;

  }
}
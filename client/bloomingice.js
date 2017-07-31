/*eslint-disable*/

import paper from 'paper';
import tones from '../public/music'

window.onload = () => {
  const canvas = document.getElementById('myCanvas');
  paper.setup(canvas);
  console.log('paper', paper);

  const canvasWidth = paper.view.size.width;
  const canvasHeight = paper.view.size.height;

  ////// base with animated gradient/////
  const basePos = [];
  const path = new paper.Path.Circle(
    new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight), 30
  );

  path.fillColor = {
    gradient: {
      stops: [['red', 0.05], ['pink', 0.7], ['rgb(112, 69, 69)', 1], ['white', 1]],
      radial: true
    },
    origin: path.position,
    destination: path.bounds.rightCenter
  };
  const gradient = path.fillColor.gradient;
  const pathS = new paper.SymbolDefinition(path);
  path.remove();

  for (var i = 0; i < 6; i++) {
    const position = (new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight));
    const pathI = pathS.place(position);
    basePos.push(pathI.position)
  }
  console.log(basePos)


  // This function is called each frame of the animation:
  paper.view.onFrame = (event) => {
    var whiteStop = gradient.stops[2];
    // Animate the offset between 0.7 and 0.9:
    whiteStop.offset = Math.sin(event.time * 5) * 0.1 + 0.8;
    // Animate the offset between 0.2 and 0.4
    var pinkStop = gradient.stops[1];
    pinkStop.offset = Math.sin(event.time * 3) * 0.1 + 0.3;
  }
}
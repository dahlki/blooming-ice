import paper from 'paper';
import tones from '../public/music';
import { playTone, stopTones, makeAudioEls, numOfCols, getCell, playRepeat, setIntervalOnNode, radialLines, startMusic, getStart } from './utils';

window.onload = () => {

  ////// setup canvas with paper /////
  const canvas = document.getElementById('myCanvas');
  paper.setup(canvas);

  let canvasWidth;
  let canvasHeight;
  console.log(paper.view.size, canvas);

  //// change canvas size when window is resized /////
  // const resizeCanvas = window.onresize = (event) => {
  //   canvasWidth = paper.view.size.width = canvas.width = (window.innerWidth * .9);
  //   canvasHeight = paper.view.size.height = canvas.height = (window.innerHeight * .9);
  //   console.log(paper.view.size, canvas);
  // }
  // resizeCanvas();
  canvasWidth = paper.view.size.width = canvas.width = (window.innerWidth * .9);
  canvasHeight = paper.view.size.height = canvas.height = (window.innerHeight * .9);

  paper.view.onResize = (event) => {
    canvasWidth = paper.view.size.width = canvas.width = (window.innerWidth * .9);
    canvasHeight = paper.view.size.height = canvas.height = (window.innerHeight * .9);
    console.log(paper.view.size, canvas);
  }

  ////// create nodes with animated gradient /////
  const nodePositions = [];

  const path = new paper.Path.Circle(
    new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight), 30
  );

  path.fillColor = {
    gradient: {
      stops: [['red', 0.05], ['pink', 0.7], ['rgb(112, 69, 69)', 1], ['rgba(255, 255, 255, 0)', 1]],
      radial: true
    },
    origin: path.position,
    destination: path.bounds.rightCenter
  };
  const gradient = path.fillColor.gradient;
  const pathS = new paper.SymbolDefinition(path);
  path.remove();

  for (let i = 0; i < 3; i++) {
    const position = (new paper.Point(Math.random() * canvasWidth, Math.random() * canvasHeight));
    const pathI = pathS.place(position);
    nodePositions.push(pathI.position)
  }

  console.log(nodePositions);

  const hitOptions = {
	fill: true,
	tolerance: 5
  };
  let moveNode = false;
  const mouse = new paper.Tool();
  let hitResult = null;
  let activeNode = null;

  function isNode(node) {
    return hitResult.item.position.x === node.x && hitResult.item.position.y === node.y
  }

  mouse.onMouseDown = (event) => {
    hitResult = paper.project.hitTest(event.point, hitOptions);
    if (!hitResult) return;
    if (hitResult.type === "fill") {
      moveNode = true;
    }
  }
  mouse.onMouseDrag = (event) => {
    if (moveNode) {
      activeNode = nodePositions.find(isNode)
      hitResult.item.position.x = activeNode.x += event.delta.x;
      hitResult.item.position.y = activeNode.y += event.delta.y;
      stopTones();
      changePlay();
    }
  }
  mouse.onMouseUp = (event) => {
    moveNode = false;
    activeNode = null;
  }

  ////// play tones of cells /////
  function play() {
    ////// draw radial lines of cells /////
    for (let i = 0; i < nodePositions.length; i++) {
      setIntervalOnNode(radialLines, 100, 150, nodePositions[i])
    }

    let cells = nodePositions.map(nodePos => {
      return getCell(nodePos, canvasWidth, canvasHeight)
    })
    cells.forEach(cell => {
      playRepeat(`${cell.y * numOfCols + cell.x + 1}ogg`)
    })
  }

  function changePlay() {
    let shouldPlay = getStart();
    if (shouldPlay) {
      let cells = nodePositions.map(nodePos => {
        return getCell(nodePos, canvasWidth, canvasHeight)
      })
      cells.forEach(cell => {
        playRepeat(`${cell.y * numOfCols + cell.x + 1}ogg`)
      })
    }
  }
  const btn = document.getElementById('startButton');
  btn.onclick = function() {
    startMusic();
    play();
  };

  paper.tool.onKeyDown = (event) => {
    startMusic();
	   if (event.key === "enter") {
       play();
     }
  }

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
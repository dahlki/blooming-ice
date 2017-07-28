/*eslint-disable*/
// const paper = require('paper');
// paper.install(window)
// const project = new Project;
// const width = paper.view.viewSize.width = 1300;
// const height = paper.view.viewSize.height = 700;

console.log('paper', paper);
console.log('window', window);
// console.log('project', project);
// let bases = [],
// centerPoints = [],
// pinkStop, whiteStop, gradient,
// let audioChords = [];
//
// let hitOptions = {
// 	fill: true,
// 	tolerance: 5
// };
//
// let NUMBER_OF_CHORDS = 30;
// let NUMBER_OF_ROWS = 3;
// let NUMBER_OF_COLS = 10;
//
// Fetch references to all chord elements in the DOM
// for( let i = 1; i <= NUMBER_OF_CHORDS; i++ ) {
//   audioChords.push( document.getElementById( 'chord' + i ) );
// }
// console.log('paper', paper);
// console.log('view', view);
// function Base () {
//   this.center = {
// 		x: Math.random() * paper.view.size.width,
//     y: Math.random() * paper.view.size.height
//   };
//   this.radius = 30;
//   // this.path = new Path.Circle({
// 	// 	center = this.center,
// 	// 	radius = this.radius
// 	// })
//   this.path.strokeColor = "white";
//
//   this.path.fillColor = {
//     gradient: {
//       stops: [['red', 0.05], ['pink', 0.2], ['white', 1]],
//       radial: true
//     },
//     origin: this.path.position,
//     destination: this.path.bounds.rightCenter
//   };
//
//   this.gradient = this.path.fillColor.gradient;
//
// }
//
// Base.prototype.onDoubleClick = function(event) {
// 	this.remove();
// }
//
// Base.prototype.loop = function() {
//   setInterval(
//     function() {
//       bases.forEach(function(base) {
//         console.log('loop');
//         pinkStop = gradient.stops[1]
//         whiteStop = gradient.stops[2]
//         pinkStop.offset = Math.sin(time * 5) * 0.1 + 0.8;
//         whiteStop.offset = Math.sin(time * 3) * 0.1 + 0.3;
//         console.log(pinkStop.offset);
//       })
//     }, 1000/60)
//   }
//
// let node = new Base();
// function onFrame(event) {
// 	console.log('hi');
//   node.loop();
// }
////// base with animated gradient/////
var basePos = [];
var path = new Path.Circle({
  center:{
    x: Math.random() * paper.view.size.width,
    y: Math.random() * paper.view.size.height
  },
  radius: 30
});

path.fillColor = {
  gradient: {
    stops: [['red', 0.05], ['pink', 0.7], ['rgb(112, 69, 69)', 1], ['white', 1]],
    radial: true
  },
  origin: path.position,
  destination: path.bounds.rightCenter
};
var gradient = path.fillColor.gradient;
var pathS = new SymbolDefinition(path);
path.remove();
// for (var i = 0; i < 6; i++) {
//   var pathI = pathS.place();
//   console.log('pathI', pathI);
//   pathI.position = Point.random()
//   // pathI.position.x *= width
//   //   pathI.position.y *= height
//   basePos.push(pathI.position)
//   console.log(basePos)
// }
for (var i = 0; i < 6; i++) {
  var pathI = pathS.place();
  pathI.position = (Point.random() * (view.size - 30));
  basePos.push(pathI.position)
}
console.log(basePos)


// This function is called each frame of the animation:
function onFrame(event) {
  var whiteStop = gradient.stops[2];
  // Animate the offset between 0.7 and 0.9:
  whiteStop.offset = Math.sin(event.time * 5) * 0.1 + 0.8;
  // Animate the offset between 0.2 and 0.4
  var pinkStop = gradient.stops[1];
  pinkStop.offset = Math.sin(event.time * 3) * 0.1 + 0.3;
}

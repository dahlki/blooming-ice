// /*eslint-disable*/
//
// let bases = [],
// centerPoints = [],
// pinkStop, whiteStop, gradient,
// audioChords;
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
// // Fetch references to all chord elements in the DOM
// for( let i = 1; i <= NUMBER_OF_CHORDS; i++ ) {
//   audioChords.push( document.getElementById( 'chord' + i ) );
// }
//
// function Base () {
//   this.center = {
// 		x: Math.random() * paper.view.size.width,
//     y: Math.random() * paper.view.size.height
//   };
//   this.radius = 30;
//   this.path = new Path.Circle({
// 		center = this.center,
// 		radius = this.radius
// 	})
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

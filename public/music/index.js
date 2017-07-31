let cache = {};

function importAll (r) {
  r.keys().forEach(key => {
    let cacheKey = key.replace(/[^\w\s]/gi, '')
    cache[cacheKey] = r(key)
  });
}

importAll(require.context('./tones/', true, /\.ogg$/));

export default cache;

// require.context(
//   "./tones", // context folder
//   true, // include subdirectories
//   /\.ogg$/ // RegExp
// )("./" + expr + "")

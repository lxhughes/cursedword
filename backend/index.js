var http = require('http');
var url = require('url');
var wl = require('./wordList');
var gu = require('./guess');

const fullwordlist = wl.getInitialWordList();

// Basic game function - takes in an array of guesses in chronological order, and outputs JSON data
runGame = function(guessstring) {
    
    const guesses = gu.guessStringToList(guessstring);
        
    // Attempt to filter out all the guesses. Return game gata.
    return wl.filterGuessList(guesses, fullwordlist);
    
}


// HTTP Server
http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var q = url.parse(req.url, true).query;
  
  var guesses = q.guesses;

  // Do game logic
  gamedata = runGame(guesses);    
    
  res.end(JSON.stringify(gamedata));
}).listen(8080);
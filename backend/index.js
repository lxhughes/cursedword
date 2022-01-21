const http = require('http');
const port = 8080;
const url = require('url');
const wl = require('./wordList');
const gu = require('./guess');
const fullwordlist = wl.getInitialWordList();

// Basic game function - takes in an array of guesses in chronological order, and outputs JSON data
runGame = function(guessstring) {
    
    const guesses = gu.guessStringToList(guessstring);
        
    // Attempt to filter out all the guesses. Return game gata.
    return wl.filterGuessList(guesses, fullwordlist);
    
}


// HTTP Server
http.createServer(function (req, res) {
    
    /* Deal with CORS */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    /* Response will be JSON */
    res.setHeader('Content-Type', 'application/json');
    
    /* Get 'guesses' from POST or GET */
    let guesses = [];
    
    console.log(req.method);
    
    if (req.method == 'POST') {
        
        var body = '';
        
        req.on('data', function (data) {
            body += data;
        });
        
        req.on('end', () => {
          console.log(JSON.parse(body));
          res.end(JSON.stringify(runGame(JSON.parse(body))));
        })
    }
    else if(req.method === 'GET'){
        var q = url.parse(req.url, true).query;
        guesses = q.guesses;
        
        // Do game logic
        gamedata = runGame(guesses);    
        res.end(JSON.stringify(gamedata));
    }
    
}).listen(port);
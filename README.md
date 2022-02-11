# Cursed Word
 
Inspired by the game Wordle by Josh Wardle, this game similarly invites the user to guess a 5-letter target word. The twist is that the game tries to thwart you by making you guess as long as possible. The first answer will always be totally wrong. The second and third answers will probably also be totally wrong. As in the Monty Hall problem, the target answer is actually not chosen until the game is forced to narrow it down from the answers you have already guessed. By making guesses, therefore, you actually determine what the correct answer will be. 

The backend is Node.js and the frontend is React.js. Currently, the game is playable on your computer if you run the backend (backend/index.js) on port 8080 and the frontend on the http-accessible port of your choice. On my todo list is putting it online. 

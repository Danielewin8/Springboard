    // Make a class called Game, added variables of height, width, and players(these will be used and given value in the constructor), all the methods we made for the game previously will also be included.

    class Game {
        constructor(p1, p2, height = 6, width = 7) {
            this.players = [p1, p2];
            this.height = height;
            this.width = width;
            this.currPlayer = p1;
            this.makeBoard();
            this.makeHtmlBoard();
            this.gameOver = false;
        }
    
        // Use the same makeBoard function we used before, but this time use 'this' for height and width(I'm still kinda shaky on how line 18 works completely) 
        makeBoard() {
            this.board = [];
            for (let y = 0; y < this.height; y++) {
                this.board.push(Array.from({ length: this.width }));
            }
        }
    
        // Use the same makeHtmlBoard function we used before, but again referencing game using 'this' instead. The later function for handleGameClick also does this 
        makeHtmlBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
    
            // make column tops (clickable area for adding a piece to that column)
            const top = document.createElement('tr');
            top.setAttribute('id', 'column-top');
            top.addEventListener("click", this.handleGameClick);
    
            for (let x = 0; x < this.width; x++) {
                const headCell = document.createElement('td');
                headCell.setAttribute('id', x);
                top.append(headCell);
            }
    
            board.append(top);
    
            // make main part of board
            for (let y = 0; y < this.height; y++) {
                const row = document.createElement('tr');
    
                for (let x = 0; x < this.width; x++) {
                    const cell = document.createElement('td');
                    cell.setAttribute('id', `${y}-${x}`);
                    row.append(cell);
                }
                    board.append(row);
            }
        }
    
        /** findSpotForCol: given column x, return top empty y (null if filled) */
    
        findSpotForCol(x) {
            for (let y = this.height - 1; y >= 0; y--) {
                if (!this.board[y][x]) {
                    return y;
                }
            }
            return null;
        }
    
        /** placeInTable: update DOM to place piece into HTML board */
    
        placeInTable(y, x) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundColor = this.currPlayer.color;
            piece.style.top = -50 * (y + 2);
    
            const spot = document.getElementById(`${y}-${x}`);
            spot.append(piece);
        }
    
        /** endGame: announce game end */
    
        endGame(msg) {
            alert(msg);
        }
    
        /** handleClick: handle click of column top to play piece */
    
        handleClick(evt) {
            // get x from ID of clicked cell
            const x = +evt.target.id;
    
            // get next spot in column (if none, ignore click)
            const y = this.findSpotForCol(x);
            if (y === null) {
                return;
            }
    
            // place piece in board and add to HTML table
            this.board[y][x] = this.currPlayer;
            this.placeInTable(y, x);
    
            // check for tie
            if (this.board.every(row => row.every(cell => cell))) {
                return this.endGame('Tie!');
            }
    
            // check for win
            if (this.checkForWin()) {
                this.gameOver = true;
                return this.endGame(`The ${this.currPlayer.color} player won!`);
            }
    
            // switch players
            this.currPlayer =
                this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
        }
    
        checkForWin() {
            // This entire section is still a lot for me to take in trying to read it all. But i get the basic gist. The comments from the solution help me here. 
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer
            const _win = cells =>
                cells.every(
                    ([y, x]) =>
                        y >= 0 &&
                        y < this.height &&
                        x >= 0 &&
                        x < this.width &&
                        this.board[y][x] === this.currPlayer
                );
    
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    // get "check list" of 4 cells (starting here) for each of the different
                    // ways to win
                    const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                    const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                    const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                    const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
                    // find winner (only checking each win-possibility as needed)
                    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                        return true;
                    }
                }
            }
        }
    }
    
    // This makes a class called Player, which is going to allow the assigning of color for the pieces without using hard CSS like before 
    
    class Player {
        constructor(color) {
            this.color = color;
        }
    }
    
    document.getElementById('start-game').addEventListener('click', () => {
        let p1 = new Player(document.getElementById('p1-color').value);
        let p2 = new Player(document.getElementById('p2-color').value);
        new Game(p1, p2);
    });
    
    // Overall the use of 'this' makes pretty good sense with how it is applied here, but can still wrack my brain a lot trying to explain it. 
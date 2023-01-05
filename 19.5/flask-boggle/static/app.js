class GameBoggle {
    constructor(boardId, secs=10) {
        this.secs = secs
        
        this.board = $("#" + boardId);
        this.words = new Set();
        this.score = 0;
        
        this.countdown = setInterval(this.timer.bind(this), 1000)

        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    }
    // appends successful word to html ul
    showWord(word) {
        $(".words", this.board).append($("<li>", { text: word }));
    }
    // used in the axios request below that shows the score total after submitting a valid word
    showScore() {
        $(".score", this.board).text(this.score)
    }
    // function used in the axios request below to show resulting message in html
    showMessage(message) {
        $(".message", this.board)
            .text(message)
    }

    // handles submission of form
    async handleSubmit(evt) {
        evt.preventDefault();
    // gets value of word submitted
        const $word = $(".word", this.board);
        let word = $word.val();
    // if word has already been submitted
        if(this.words.has(word)){
            this.showMessage(`${word} has already been submitted!`)
            return;
        }
    // sends word value to server and checks validity 
        const resp = await axios.get("/check-word", { params: { word: word } });
        if (resp.data.result === "not-word") {
            this.showMessage("not a word");
        } else if (resp.data.result === "not-on-board") {
            this.showMessage("not on board");
        } else {
            this.showWord(word);
            this.words.add(word);
            this.score += word.length;
            this.showScore();
            this.showMessage(`Added: ${word}`, "ok");
        }
    }
    // functionality to show a 60 second timer and an ending message for score total.
    showTimer() {
        $(".timer", this.board).text(this.secs)
    }
    async timer() {
        this.secs -= 1;
        this.showTimer();
        if(this.secs === 0) {
            clearInterval(this.countdown);
            $(".add-word", this.board).hide();
            this.showMessage(`Time's up! Your final score is ${this.score}!`)
        }
    }
}
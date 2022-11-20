//var board will be the starting board. var solution will be solution board.
//code will compare input at specific coordinate with solution. IF correct, it will place number there. IF incorrect, error +1.
//each tile has an id of 0-8  horizontal and vertical like a coordinate system

var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
}

//populates board and digits and prepares them so user can interact with them
function setGame() {
    //digits 1-9; i++ means i = i+1, increments the variable up by 1
    for (let i = 1; i <=9; i++) {
        //created <div></div> in js, then set id
        //<div id="1" class="number">1</div>
        //<div id="2" class="number">2</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber); //listens for click on the number board and cells selectNumber function when element gets clicked on
        number.classList.add("number");
        document.getElementById("digits").appendChild(number); //puts numbers 1-9 into digits
    }

    // board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c=0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); //creates tile id which is r-c, r is row number, c is column number
            if (board[r][c] != "-"){ //only fills the number if rc does not equal '-', so '-' not displayed
                tile.innerText = board[r][c];
                tile.classList.add("tile-start") //fills start tiles with tile-start grey background
            }
            if (r==2 || r==5) {
                tile.classList.add("horizontal-line");
            }
            if (c==2 || c==5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
        //if numSelected is not null, so if we selected a number earlier, removes the highlight. lets us toggle highlight by only most recent select
    if (numSelected !=null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this; //this refers to div itself in line 43
    numSelected.classList.add("number-selected"); //when you click, it adds the number-selected css style
}

//create a function to select the board tile and have tile show selected number
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        } //if the tile has a number in it you exit the function, so you can't override already placed number
        let coords = this.id.split("-"); //takes coords "0-0" and splits into ["0", "0"]
        let r = parseInt(coords[0]); //turns string into int
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id; //if a number is selected and you click 'this' aka div element aka tile itself, the tile changes to selected number
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
     }
}
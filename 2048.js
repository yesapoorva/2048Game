var board;
var score=0;
var rows=4;
var columns=4;
var gameOver= false;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    //     board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){

            let tile=document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // <div id="0-0"></div>
            let num = board[r][c];
            updateTile(tile, num); // to update the number and style class for that number 
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c] ==0 ){
                gameOver=true;
                return true;
                      // returns true when empty tile is found 
            }
        }

    }
    return false; 
}

function displayGameOver() {
    displayText("Game Over!", color(119, 110, 101), 32, width / 2, height / 2);
}

function setTwo(){
    if(!hasEmptyTile()){  //if there are no more empty tiles, return out of function , end game 
        //displayText("Game Over!", color(119, 110, 101), 32, width / 2, height / 2);
        if (gameOver) {
            displayGameOver();
        }
        return;
    }

    let found = false;
    while (!found){
        let r=Math.floor(Math.random()*rows); 
        let c=Math.floor(Math.random()*columns);

        if(board[r][c] == 0){  // if board is empty, add 2 there
            board[r][c] = 2;
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found=true;
        }
    }
}

function updateTile(tile, num){ // add the correct number in tile and correct style 
    tile.innerText = ""; //text inside tile cleared
    tile.classList.value= "";  //clear the classlist from "tile x2" to "tile"
    tile.classList.add("tile");
    if(num>0){
        tile.innerText= num;
        if(num <= 32){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x64");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num !=0); // creates new arrray without zero
}

function slide(row){
    row=filterZero(row);  //clear zeroes [2 2 2 0] > [2 2 2]

    for(let i=0; i<row.length; i++){ // slide numbers [2 2 2] > [ 4 0 2]
        if(row[i] == row[i+1]){
            row[i] *=2;
            row[i+1] =0;
            score += row[i];
        }
    }

    row=filterZero(row); // [4 0 2] > [4 2]

    while(row.length<columns){ //[4 2] > [4 2 0 0]
        row.push(0);
    }

    return row;
}

function slideLeft(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row= slide(row); // slide() modifies array
        board[r] = row; 

        for(let c=0; c<columns; c++){
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row.reverse();
        row= slide(row);
        row.reverse();
        board[r] = row; 

        for(let c=0; c<columns; c++){
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for(let c=0;c<columns;c++){
        let row= [board[0][c], board[1][c], board[2][c], board[3][c]];
        row=slide(row);
        // board[0][c] =row[0]; //updating the values of row into board
        // board[1][c] =row[1];
        // board[2][c] =row[2];
        // board[3][c] =row[3];

        for(let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c=0;c<columns;c++){
        let row= [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row=slide(row);
        row.reverse();

        for(let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile= document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}
var GRID_SIZE=8;
var PINGU_NBR=10;
var w = 50;


function createGrid(rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
        for (var j=0;j<rows;j++) {
            arr[i].push(new Cell());
        }
    }
    return arr;
}

// get random item from a Set
function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}


function Cell(){

    this.content = 'EMPTY';

};

function Board(){

    this.grid = createGrid(GRID_SIZE);

    this.generateGame = function(){

        nbrOfPlacedPinugs = 0; // Number of pingus we have placed so far

        // Create set of available positions
        availablePositions = new Set();
        for(var i = 0; i < GRID_SIZE*GRID_SIZE; i++)
            availablePositions.add(i);


//            while( nbrOfPlacedPinugs < PINGU_NBR ){
        while(availablePositions.size > 0){

            randomPos = getRandomItem(availablePositions);

            let x = randomPos % GRID_SIZE;
            let y = Math.floor(randomPos / GRID_SIZE);

            console.log("XY " + x + ' ' + y);
            this.grid[x][y].content = 'PINGU';
            availablePositions.delete(randomPos);

            //Remove all 8 neigbours from set so we won't pick them next time
            availablePositions.delete(  (x-1) + (y-1)*GRID_SIZE);
            availablePositions.delete(  (x+0) + (y-1)*GRID_SIZE);
            availablePositions.delete(  (x+1) + (y-1)*GRID_SIZE);
            availablePositions.delete(  (x+1) + (y+0)*GRID_SIZE);
            availablePositions.delete(  (x+1) + (y+1)*GRID_SIZE);
            availablePositions.delete(  (x+0) + (y+1)*GRID_SIZE);
            availablePositions.delete(  (x-1) + (y+1)*GRID_SIZE);
            availablePositions.delete(  (x-1) + (y+0)*GRID_SIZE);

            nbrOfPlacedPinugs++;

            console.log(availablePositions);
        }

        console.log("GRID");
        console.log(this.grid);

    };

    this.display = function(){

        //background(0);
        for(let row=0; row< GRID_SIZE; row++){
            for(let col=0; col< GRID_SIZE; col++){

                if(this.grid[row][col].content == 'PINGU' ){
                    console.log("pingu");
                    fill(255, 204, 0);
                }else{
                    fill(255);
                }
                rect(row*w, col*w, w, w, 0);
            }
        }
    };


};


function setup(){


    createCanvas(800,800);
    //background(0);
    board = new Board();

    board.generateGame();

    board.display();


}

function draw(){


//    ellipse(50, 50, 80, 80);
}

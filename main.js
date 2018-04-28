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
    this.placed_content = 'EMPTY';

    this.toggleContent = function(){
        switch(this.placed_content){
            case 'EMPTY':
                this.placed_content= 'GRASS';
                break;
            case 'GRASS':
                this.placed_content= 'PLACED_PINGU';
                break;
            case 'PLACED_PINGU':
                this.placed_content= 'EMPTY';
                break;
        }
    }

};

function Board(){

    this.grid = createGrid(GRID_SIZE);

    this.generateGame = function(){

        // Create set of available positions
        availablePositions = new Set();
        for(var i = 0; i < GRID_SIZE*GRID_SIZE; i++)
            availablePositions.add(i);


        var timeOut = 0;
        while(availablePositions.size > 0){

            randomPos = getRandomItem(availablePositions);

            let x = randomPos % GRID_SIZE;
            let y = Math.floor(randomPos / GRID_SIZE);

            console.log("XY " + x + ' ' + y);
            this.grid[x][y].content = 'PINGU';

            // Place a tibou next to the pingu
            var isTibouPlaced = false;
            while( !isTibouPlaced ){
               let tibouPos =  Math.floor(Math.random()*4);
               switch(tibouPos){
                   case 0:
                        if(x-1>=0 && this.grid[x-1][y].content == 'EMPTY' ){
                            this.grid[x-1][y].placed_content = 'TIBOU';
                            isTibouPlaced = true;
                        }
                        break;
                   case 1: if(x+1<GRID_SIZE && this.grid[x+1][y].content == 'EMPTY' ){
                            this.grid[x+1][y].placed_content = 'TIBOU';
                            isTibouPlaced = true;
                        }
                        break;
                   case 2:
                        if(y-1>=0 && this.grid[x][y-1].content == 'EMPTY' ){
                            this.grid[x][y-1].placed_content = 'TIBOU';
                            isTibouPlaced = true;
                        }
                        break;
                   case 3:
                        if(y+1<GRID_SIZE && this.grid[x][y+1].content == 'EMPTY' ){
                            this.grid[x][y+1].placed_content = 'TIBOU';
                            isTibouPlaced = true;
                        }
                        break;
               }
               if(++timeOut > 100000){
                   alert("impossible to create grid");
               }
               
            }




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

            console.log(availablePositions);
        }

        console.log("GRID");
        console.log(this.grid);

    };

    this.display = function(){

        //background(0);
        for(let row=0; row< GRID_SIZE; row++){
            for(let col=0; col< GRID_SIZE; col++){

                fill(255);
                switch(this.grid[row][col].placed_content){
                    case 'TIBOU':
                    image(tibouImg, row*w, col*w, w, w);
                    break;
                    case 'PLACED_PINGU':
                    console.log("COUCOU");
                    image(pinguImg, row*w, col*w, w, w);
                    break;
                    case 'GRASS':
                    image(grassImg, row*w, col*w, w, w);
                    break;
                    case 'EMPTY':
                    image(emptyImg, row*w, col*w, w, w);
                    break;
                }
//                rect(row*w, col*w, w, w, 0);

            }
        }
    };


};


board = new Board();

function preload() {
    tibouImg = loadImage('images/tibou.png');
    pinguImg = loadImage('images/pingu.png');
    grassImg = loadImage('images/grass.png');
    emptyImg = loadImage('images/empty.png');
  }

function setup(){


    // createCanvas(800,800);
    createCanvas(windowWidth, windowHeight);
    w = (windowHeight-40) /  GRID_SIZE;
    //background(0);
    console.log(w);

    board.generateGame();

//    board.display();


}


function draw(){
    translate(windowWidth/2-(w*GRID_SIZE)/2, 0);

    board.display();

//    ellipse(50, 50, 80, 80);
}

function mouseClicked() {
    let rectangleX = Math.floor((mouseX-(windowWidth/2-(w*GRID_SIZE)/2)) /w)
    let rectangleY = Math.floor(mouseY/w);
    console.log(rectangleX + ' ' + rectangleY);
    if(rectangleX >= 0 && rectangleX < GRID_SIZE && rectangleY >= 0 && rectangleY < GRID_SIZE){
        board.grid[rectangleX][rectangleY].toggleContent();
    }

  }
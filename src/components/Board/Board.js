import React, { Component } from 'react'
import Cell from '../Cell/Cell';
import Row from '../Row/Row'


class Board extends Component {

    constructor(props) {
        super(props);

        this.state= {table: this.createtable(props), color : 'solid'};
        
        this.open = this.open.bind(this);
        this.openCleanSpaces = this.openCleanSpaces.bind(this);
    }

    createtable = props => {
        let board = [];
        
        for (let i = 0; i < props.rows; i++){
            board.push([]);

            for (let j = 0; j < props.columns; j++){
                board[i].push({
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    flags: props.flags,
                    hasFlag: false
                });
            }

//add the mines to the table
        }
        const mines = []

        for (let i = 0; i < props.mines && mines.length<= props.mines; i++){
            let randomRow = Math.floor(Math.random()*props.rows);
            let randomColumn = Math.floor(Math.random() * props.columns);
            let cell = board[randomRow][randomColumn];
            if (!cell.hasMine){
                mines.push(cell);
                cell.hasMine = true;
            }
        }

//add the count (number of adjacent mines arount) to the cell propety
        let r = props.rows;
        let c = props.columns;
        let dir = [[1,0], [-1,0], [0,1], [0,-1], [-1,-1], [-1,1], [1,1], [1,-1]];

        function valid(i,j){
            if (i>=0 && j>=0 && i < r && j < c){
                return true;
            }
            return false;
        }


        function find(i,j,board){
            let s = 0;
            for (let k = 0; k < 8; k ++){
                let ni = i + dir[k][0];
                let nj = j + dir[k][1];
                if (valid (ni,nj))
                    if (board[ni][nj].hasMine)
                        s+=1;
            }
            return s;
        }

        
        function findsomeofneighbors(board){

            for (let i = 0;  i < r; i++){
                for (let j = 0; j< c; j++)
                {
                    board[i][j].count = find(i,j,board)
                }
            }
        }

        findsomeofneighbors(board);
        return board;
    };








    // a function that gets a cell and incremaens the number of flags and update the boolean of this cel
    handleLeftClick = Cell =>
   {
         Cell.isOpen = true;
         let newFlags = this.props.flags+ +1 
         this.setState({flags:newFlags});

        
   }

        


    //a function that opens all the cells around a cell (if has no mines and its not a flag)

   openCleanSpaces = Cell => {

    let currentcell = this.state.table[Cell.y][Cell.x];
    let newRows = this.state.table;
    let newOpens = []   //create empty array of all the cells that opend in the first iterations
    newOpens.push(currentcell);
    let i = 0;

//iterate over the number of open cells
for (let i = 0; i<newOpens.length; i++)
{
    for (let r = -1; r <= 1; r++)
    {
        for (let c = -1; c <= 1; c++)
          {
              let newx = newOpens[i].x + c;
              let newy = newOpens[i].y + r;
              console.log(newx,newy);
                if (newx>=0 && newy>=0 && newx < this.state.table.length && newy < this.state.table.length)
                  {
                    if (newRows[newy][newx].count === 0 && !newRows[newy][newx].hasMine && !newRows[newy][newx].hasFlag && !newRows[newy][newx].isOpen)
                    {
                        newRows[newy][newx].isOpen = true;
                        newOpens.push(newRows[newy][newx]);
                        this.props.increamentOpenCells(newOpens.length);
                  }
          }
        
    }


} 

   }
    this.setState({rows:newRows});



   }





//update the number of flags - when right click
    updateFlag = Cell => {
        console.log("here in updateflag function");
        this.props.increamentFlags();
        this.props.increamentOpenCells(1);
        let currentcell = this.state.table[Cell.y][Cell.x];
        currentcell.hasFlag = true;
        let newRows = this.state.table;
        newRows[Cell.y][Cell.x] = currentcell;
        this.setState({rows:newRows});
    }    



    

    
//a function that deals when the cell is open - 3 cases

    open = Cell => {


        this.props.checkIfWin();   //always check if the player is winning
        this.setState({color:'Beige'})   //change the color of the cell when opned
            if (this.props.status === 0){
                //start the game
                let op = 1 //op for starting the game
                this.props.updateStatus(op);
                alert("start the game")
                this.props.startTimer();   //reset the timer
            };

           
            let currentcell = this.state.table[Cell.y][Cell.x];
            console.log(currentcell);

    if (!currentcell.isOpen){

        // if you clicked on empty cell - open all the empty cells (count = 0) around it
            if (currentcell.count == 0 && !currentcell.hasMine)
            {
                currentcell.isOpen = true;
                let newrows = this.state.table;
                newrows[Cell.y, Cell.x].isOpen = currentcell; 
                this.setState({rows:newrows});
                this.props.increamentOpenCells(1);
                this.openCleanSpaces(currentcell);
            }

            else 

            // if you clicked a mine and havn't started the game yet - initialize the game
            if (currentcell.hasMine && this.props.openCells === 0){

                console.log("cell already has mine, restart");
                let newRows = this.createtable(this.props);
                this.setState({rows:newRows});
                
            }
            
            else 
            //it shows the number of mines arount it 
                if (!currentcell.hasFlag && !currentcell.isOpen && !currentcell.hasMine && currentcell.count > 0 ) 
                {
                    currentcell.isOpen = true;
                    this.props.increamentOpenCells(1);
                    let newrows = this.state.table;
                    newrows[Cell.y, Cell.x].isOpen = currentcell; 
                    this.setState({rows:newrows});
                    //show the count
                }
            
                //You clicked on a mine - end game
                if (currentcell.hasMine && this.props.openCells!=0)
                {
                    let op = 2;   // op for ending the game
                    this.props.updateStatus(op);
                    alert("game is over")
                    this.props.reseetButton();

                }

    }
    }


 


    render() {
        let rows = this.state.table.map((cells, index) => (
          <Row
            cells={cells}
            open={this.open}
            flag={this.flags}
            openCleanSpaces = {this.openCleanSpaces}
            updateFlag = {this.updateFlag}
            key={index}
            increamentOpenCells = {this.increamentOpenCells}
            color = {this.state.color}
          />
        ));
        return <div className="board">{rows}</div>;
      }
    }

export default Board

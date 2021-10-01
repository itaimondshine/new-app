import React, { Component } from 'react'
import Cell from '../Cell';
import Row from '../Row'


class Board extends Component {

    constructor(props) {
        super(props);

        this.state= {
            rows : this.createBoard(props),
            color : 'solid'
        };
        
        this.open = this.open.bind(this);
        this.openCleanSpaces = this.openCleanSpaces.bind(this);
    }

    createBoard = props => {
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
            //now we need to add the mines


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
        console.log(mines);
        console.log(board);
        return board;

    };





   handleLeftClick = Cell =>
   {
         Cell.isOpen = true;
         let newFlags = this.props.flags+ +1 
         this.setState({flags:newFlags});

        
   }

        


    //a function that turn on and turn off flags




    //update the count value of each cell




    //a function that opens all the cells around a cell (if has no mines and its not a flag)



    // a function that gets a cell and incremaens the number of flags and update the boolean of this cel


   openCleanSpaces = Cell => {

    let currentcell = this.state.rows[Cell.y][Cell.x];
    let newRows = this.state.rows;
    let newOpens = []
    newOpens.push(currentcell);
    let i = 0;


for (let i = 0; i<newOpens.length; i++)
{
    for (let r = -1; r <= 1; r++)
    {
        for (let c = -1; c <= 1; c++)
          {
              let newx = newOpens[i].x + c;
              let newy = newOpens[i].y + r;
              console.log(newx,newy);
                if (newx>=0 && newy>=0 && newx < this.state.rows.length && newy < this.state.rows.length)
                  {
                    if (newRows[newy][newx].count === 0 && !newRows[newy][newx].hasMine && !newRows[newy][newx].hasFlag && !newRows[newy][newx].isOpen)
                    {
                        newRows[newy][newx].isOpen = true;
                        console.log("new one");
                        console.log('second');
                        newOpens.push(newRows[newy][newx]);
                        console.log(newOpens);
                        this.props.increamentOpenCells(newOpens.length);
                        // this.openCleanSpaces(newRows[newy][newx]);
                  }
          }
        
    }


} 

   }
    this.setState({rows:newRows});



   }






    updateFlag = Cell => {
        console.log("here in updateflag function");
        this.props.increamentFlags();
        this.props.increamentOpenCells(1);
        let currentcell = this.state.rows[Cell.y][Cell.x];
        currentcell.hasFlag = true;
        let newRows = this.state.rows;
        newRows[Cell.y][Cell.x] = currentcell;
        this.setState({rows:newRows});
    }    


//not finished


    


    open = Cell => {

        this.props.checkIfWin();
        this.setState({color:'green'})
            if (this.props.status === 0){
                //start the game
                let op = 1 //op for starting the game
                this.props.updateStatus(op);
                alert("start the game")
                this.props.startTimer();

                
            };

           
            let currentcell = this.state.rows[Cell.y][Cell.x];
            console.log(currentcell);
            // if you clicked a mine and havn't started the game yet

            //and status 

    if (!currentcell.isOpen){
            if (currentcell.count == 0 && !currentcell.hasMine)
            {
                currentcell.isOpen = true;
                let newrows = this.state.rows;
                newrows[Cell.y, Cell.x].isOpen = currentcell; 
                this.setState({rows:newrows});
                this.props.increamentOpenCells(1);
                console.log("count = 0")
                this.openCleanSpaces(currentcell);
            }

            else 
            if (currentcell.hasMine && this.props.openCells === 0){

                console.log("cell already has mine, restart");
                let newRows = this.createBoard(this.props);
                this.setState({rows:newRows});
                
 
            }
            
            //check for 
            else 
            //it shows the number of mines arount it - lets write a function that calcultates the number of mines
                if (!currentcell.hasFlag && !currentcell.isOpen && !currentcell.hasMine && currentcell.count > 0 ) 
                {
                    // this.props.openGame();
                    currentcell.isOpen = true;
                    this.props.increamentOpenCells(1);
                    let newrows = this.state.rows;
                    newrows[Cell.y, Cell.x].isOpen = currentcell; 
                    this.setState({rows:newrows});
                    console.log(this.state.rows);
                    console.log(this.state.rows[Cell.y, Cell.x])
                    //show the count
                }
            
                //end game
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
        let rows = this.state.rows.map((cells, index) => (
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

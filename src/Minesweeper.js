import React, { Component } from 'react';
import reactDom from 'react-dom';
import PropTypes from 'prop-types';
import Board from './components/Board/Board';
import BoardHead from './components/BoardHead/BoardHead';

 class Minesweeper extends React.Component {

    constructor(props){
        super(props);
     
        this.state = {
                rows: props.rows,
                columns : props.columns,
                flags: 0,
                mines: props.mines,
                time: 0,
                status: 0, //at game starts: waiting, running, ended
                openCells : 0



        };
        // this.openGameClick = this.openGameClick.bind(this);
        this.increamentFlags = this.increamentFlags.bind(this);
        this.increamentOpenCells = this.increamentOpenCells.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.tick = this.tick.bind(this);
    
    }



    // a function that increse the time every second
    tick = ()=>
    {
        if (this.state.status == 1) {
            let newtime = this.state.time + 1;
            this.setState({time:newtime});
        }
    }



    startTimer= () => {
        let interval = null
         interval = setInterval(this.tick, 1000);
        this.setState({interval:interval});
    };



// if the player opned all the cells in the game
    checkIfWin = ()=> {
        let numOfCells = this.state.rows * this.state.columns;
        if (this.state.openCells == numOfCells)
        alert("You win!!!");

    }




    
//Update Functions


//update the status of the game {0: not started, 1: running 2: end game}
    updateStatus = Number => {
        this.setState({status:Number});
    }



    //force a stopping of the game
    reseetButton() {
        window.location.reload();
    }

     // increament the number of flags by 1
     increamentFlags = Cell => 
     { 
         let currentNumber = this.state.flags;
         this.setState({flags: (currentNumber + 1)});
     }

    //increase the number of open cells by 1
     increamentOpenCells(number)
     {
        this.setState({openCells: (this.state.openCells + number)});
    }

   

        render() {
            return (
                    
                <div className = 'minesweeper'>

                    <h1> My Minesweeper Game </h1>
                    
                    <div className = 'boardheader'>
                    <BoardHead time = {this.state.time} flagcount= {this.state.flags} openCells= {this.state.openCells}
                    startTimer = {this.startTimer}
                    reseetButton = {this.reseetButton}
                    mines = {this.state.mines}/>
                    </div>


                    <Board rows = {this.state.rows} columns = {this.state.columns}
                    mines = {this.state.mines} openGame = {this.openGameClick}
                    openCells ={this.state.openCells} flags = {this.state.flags}
                    increamentFlags = {this.increamentFlags}
                    increamentOpenCells = {this.increamentOpenCells}
                    status={this.state.status}
                    updateStatus = {this.updateStatus}
                    startTimer = {this.startTimer}
                    reseetButton = {this.reseetButton}
                    checkIfWin = {this.checkIfWin}
                /> 
                </div>

                
            )
        }

 
 }

export default Minesweeper

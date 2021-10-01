import React from 'react';
import ReactDOM from 'react-dom';
import {format} from 'react-string-format'



function BoardHead(props){

    let minutes = Math.floor(props.time/ 60);
    let seconds = Math.floor(props.time - minutes * 60);
    let secondstoformat = seconds < 10 ? format('0{0}',seconds) : seconds
    let time = format('{0}:{1}',minutes,secondstoformat);
    


    return (
        <div className="board-head">
        <div className="flag-count"> {props.flagcount}</div>
        <button className="reset" onClick = {props.reseetButton}> Reset</button>
        <div className="timer"> {time}  </div>
        <div className="flags"> {props.flagcount} </div>
        <div className="openCells"> {props.openCells} </div>



        </div>
    );
};


    

export default BoardHead
import React from 'react'
import Cell from '../Cell/Cell'

const Row = (props) => {
    let cells = props.cells.map((cell,index) => {
    return (<Cell key={index}  celldata = {cell} open= {props.open} updateFlag = {props.updateFlag} openCleanSpaces= {props.openCleanSpaces} color= {props.color}
        increamentOpenCells = {props.increamentOpenCells}/>)})
    return (
        <div className = "row">

        {cells}    
        </div>
    );


}

export default Row;
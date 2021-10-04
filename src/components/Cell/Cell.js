
import React from "react";
import flag from "/Users/itaimondshine/SampleJS/new-app/src/components/Cell/flag.png"


let RenderCell = function(props) {
  let cell =  function ()  {

    if (props.celldata.isOpen) {

    //first case - the cell has a mine -> the game is over.  
      if (props.celldata.hasMine) {
        return (
          <div className="cell"  style={{ backgroundColor: props.color  }} 
           onContextMenu={() => props.updateFlag(props.celldata)} onClick={() => props.open(props.celldata)}> 
           {props.celldata.hasFlag && <img src = {flag} height = "50" width = "50" />}
          </div>
        );

      } 
      
      // second case - the cell has count 0 (no mines neighbhors) -> all the cells around it will be open. 
      else if (props.celldata.count === 0 && !props.celldata.hasMine) {
        return (
          <div
            className="cell" onContextMenu={() => props.updateFlag(props.celldata)}
            style={{ backgroundColor: props.color }} onClick={() => props.open(props.celldata)}
          > 
          {props.celldata.hasFlag && <img src = {flag} height = "50" width = "50"/>}

        </div>
        );
      } 
      
      // thrird case - the cell has count > 0 and has no mines -> you should unvover the number of mines arount it.
      else {
        return (
          <div
            className="cell" onContextMenu={e => {
                // don't load that nasty context menu, flag it up instead :^)
                
                
e.preventDefault();
               props.updateFlag(props.celldata)}} onClick={() => props.open(props.celldata)} >{ props.celldata.count}          
            </div>
        );
      }
    } 
    

     else 
     {

        return (
            <div className="cell" onContextMenu={e => {
                // don't load that nasty context menu, flag it up instead :^)
                e.preventDefault();
               props.updateFlag(props.celldata)}}             
               style={{ backgroundColor: 'AntiqueWhite'}} onClick={() => props.open(props.celldata)}> 
            {props.celldata.hasFlag && <img src = {flag} height = "50" width = "50" />}
    
            </div>)
    }


  };
  return cell();
}

export default RenderCell;
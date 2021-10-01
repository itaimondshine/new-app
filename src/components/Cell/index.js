
import React from "react";
import flag from "/Users/itaimondshine/SampleJS/new-app/src/components/Cell/flag.png"





let RenderCell = function(props) {

 

  let cell =  function ()  {

    if (props.data.isOpen) {

    //first case - the cell has a mine -> the game is over.  
      if (props.data.hasMine) {
        return (
          <div className="cell open"  style={{ backgroundColor: props.color  }} 
           onContextMenu={() => props.updateFlag(props.data)} onClick={() => props.open(props.data)}> 
           {props.data.hasFlag && <img src = {flag} height = "50" width = "50" />}

           

          </div>
        );

      } 
      
      // second case - the cell has count 0 (no mines neighbhors) -> all the cells around it will be open. 
      else if (props.data.count === 0 && !props.data.hasMine) {
        return (
          <div
            className="cell open"
            onContextMenu={() => props.updateFlag(props.data)}
            style={{ backgroundColor: props.color }} 
            onClick={() => props.open(props.data)}
          > 
          {props.data.hasFlag && <img src = {flag} height = "50" width = "50"/>}

              </div>
        );
      } 
      
      // thrird case - the cell has count > 0 and has no mines -> you should unvover the number of mines arount it.
      else {
        return (
          <div
            className="cell open" onContextMenu={e => {
                // don't load that nasty context menu, flag it up instead :^)
                e.preventDefault();
               props.updateFlag(props.data)}} onClick={() => props.open(props.data)} >{ props.data.count}          
            </div>
        );
      }
    } 
    
    // 
    // else if (props.data.hasFlag) {
    //   return (
    //     <div
    //       className="cell open-flag"
    //       onContextMenu={
    //         <div className="img"> <img src = {flag} style ={{color:"red"}} width="55" height="55"/> </div>
    //      }
    //       onClick={() => props.open(props.data)}
    //     >
    //     </div>
    //   );}
     else 
     {

        return (
            <div className="cell open" onContextMenu={e => {
                // don't load that nasty context menu, flag it up instead :^)
                e.preventDefault();
               props.updateFlag(props.data)}}             
               style={{ backgroundColor: 'AntiqueWhite'}} onClick={() => props.open(props.data)}> 
            {props.data.hasFlag && <img src = {flag} height = "50" width = "50" />}
    
            </div>)
    }


  };
  return cell();
}

export default RenderCell;
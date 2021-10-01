import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Minesweeper from '../../Minesweeper';
import reactDom from 'react-dom';
import flag from "/Users/itaimondshine/SampleJS/new-app/src/components/Cell/flag.png"


 class Login extends React.PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            rows: 9,
            columns : 9,
            mines : 10,
            submitted: false,

        };

        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.hadnleColumnsChange = this.hadnleColumnsChange.bind(this);
        this.hadnleMinesChange = this.hadnleMinesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleRowsChange(event) {
        this.setState({rows:event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });  // set the flag on submit
        console.log(this.state.input)
   }

    hadnleColumnsChange(event) {
        this.setState({columns:event.target.value});
    }


    hadnleMinesChange(event) {
        this.setState({mines:event.target.value});
    }


     
   handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });  // set the flag on submit
    console.log(this.state.rows);
}  

    
    render() {

        if (this.state.submitted) {  
            return <Minesweeper rows = {this.state.rows} columns = {this.state.columns} mines = {this.state.mines}/>

        }

        return (

            <div className="login"> 
            <h1> Login start</h1>

            <form >

            <label>
            Enter Number Of Rows:
                <input type ="number"  name = "rows" min = "8" max = "100" value = {this.state.rows} onChange = 
                 {this.handleRowsChange} />
            </label>

            <label>
            Enter Number of Columns:
            <input type ="number" value = { this.state.columns} onChange = {this.hadnleColumnsChange} />
            </label>
            
            <label>
            Enter Number Of Mines: 
            <input type ="number" value = {this.state.mines} onChange =  {this.hadnleMinesChange } />
            </label>

            <button type="submit" onClick= {this.handleSubmit}> enter params </button>
    


            </form>

            </div>
            

            
        
        )
    }

}

export default Login

// export default Login


// class Login extends React.Component {
//     state = {
//       show: true,
//     }
  
//     toggle = () => this.setState((currentState) => ({show: !currentState.show}));
  
//     render() {
//       return (
//         <div>
//           <button onClick={this.toggle}>
//             toggle: {this.state.show ? 'show' : 'hide'}
//           </button>    
//           {this.state.show && <div>Hi there</div>}
//         </div>
//        );
//     }
//   }

//   export default Login
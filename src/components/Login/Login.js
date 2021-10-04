import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Minesweeper from '../../Minesweeper';
import reactDom from 'react-dom';
import flag from "/Users/itaimondshine/SampleJS/new-app/src/components/Cell/flag.png"


// class of the Login Screnn Component
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

//handler for rows change
    handleRowsChange(event) {
        this.setState({rows:event.target.value});
    }

//handler for enter parms button
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });  // set the flag on submit
   }

//handler for columns change
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

            <label name="rows">
            Enter Number Of Rows:
                <input type ="number"  name = "rows" min = "8" max = "100" value = {this.state.rows} onChange = 
                 {this.handleRowsChange} />
            </label>

            <label>
            Enter Number of Columns:
            <input type ="number" name="cols" value = { this.state.columns} onChange = {this.hadnleColumnsChange} />
            </label>
            
            <label>
            Enter Number Of Mines: 
            <input type ="number" name="mines" value = {this.state.mines} onChange =  {this.hadnleMinesChange } />
            </label>

            <button type="submit" onClick= {this.handleSubmit}> enter params </button>
    


            </form>

            </div>
            

            
        
        )
    }

}

export default Login

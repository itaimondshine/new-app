import React, { Component } from 'react'


class Clock extends React.Component{
    constructor(props){

        super(props);




    }


    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);}
        
}
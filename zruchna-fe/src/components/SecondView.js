import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SecondView extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.push('/')
    }
    render(){
        return (
            <div>
                <h1>Second hello</h1>
                <Link to="/">click</Link>
            </div>
        )
    }
}

export default SecondView;
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import { Link } from 'react-router-dom';

class SecondViewWOData extends Component {
    render(){
        const {loading, error, choice} = this.props.data
        if (loading){
            return <p>Loading...</p>
        }
        if(error){
            return <p>{error.message}</p>
        }
        return <h1>{choice.choiceText}</h1>
    }
}
const firstQuery = gql`
query test($id: ID!){
    choice(id:$id){
        choiceText
    }
  }
`
const SecondView = graphql(firstQuery,{
    options: props => ({
        variables: {
            id: props.match.params.id
        }
    })
})(SecondViewWOData)
export default SecondView;
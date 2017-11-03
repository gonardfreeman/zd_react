import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

class WithOutData extends Component {
    constructor(props){
        super(props);
        this.clicker = this.clicker.bind(this);
    }
    clicker(){
        this.props.history.push('/test')
    }
    loadData({ data: {loading, error, allChoices }}){
        if (loading) {
            return <p>Loading ...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return <ul>
        {allChoices.edges.map(
            choice => (<li key={choice.node.id}>
                <h2>Choice</h2>
                <p>{choice.node.choiceText}</p>
                <p>{choice.node.votes}</p>
                <h2>Question</h2>
                <p>{choice.node.question.questionText}</p>
                <p>{choice.node.question.pubDate}</p>
            </li>)
        )}
        </ul>;
    }
    render(){
        return (
            <div>
                <h1>Hello react</h1>
                <div>{this.loadData(this.props)}</div>
                <Link to="/test">click</Link>
            </div>
        )
    }
}

const firstQuery = gql`
query {
    allChoices{
      edges{
        node{
          id
          choiceText
          votes
          question{
            questionText
            pubDate
          }
        }
      }
    }
  }
`
const WithData = graphql(firstQuery)(WithOutData)
export default WithData;
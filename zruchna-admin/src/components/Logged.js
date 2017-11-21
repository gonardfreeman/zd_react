import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const additionalInfo = ({data: {allAuthUsers, error, loading}}) => {
    if (loading) {
        return <h2>Loading..</h2>;
    }
    if (error) {
        return <h2>{error.message}</h2>
    }
    const { firstName, lastName, email, isSuperuser } = allAuthUsers.edges[0].node;
    return (
        <div>
            <h2>More data about you:</h2>
            <ul>
                <li>Fullname: {`${firstName} ${lastName}`}</li>
                <li>
                    Email: <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li>Your role is {isSuperuser ? 'admin' : 'staf'}</li>
            </ul>
        </div>
    )
}

class Logged extends Component {
    state = {
        redirectToReferrer: false
    }
    componentWillMount(){
        const {is_logged} = this.props.fetchApp;
        if (is_logged) {
            this.setState({ redirectToReferrer: true })
        }
    }
    render() {
        console.log(this.props)
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer) {
            if (from.pathname !== '/') {
                return (
                    <Redirect to={from}/>
                )
            }
        }
        const {user_name, last_visit, is_logged} = this.props.fetchApp;
        if (!is_logged) {
            return <Redirect to={{
                pathname: "/",
                state: {from: this.props.location}
            }}/>
        }
        return (
            <div>
                <div className="title">
                    <h1>Hello {user_name}</h1>
                </div>
                <div className="body">
                    <p>Your last visit was at: {last_visit}</p>
                    {additionalInfo(this.props)}
                </div>
                <Link to="/users">Users</Link>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    const { fetchApp } = state;
    return {
        fetchApp
    };
}
const firstQuery = gql`
query getUser($userName: String){
    allAuthUsers(userName:$userName){
      edges{
        node{
          userName
          firstName
          lastName
          email
          isSuperuser
        }
      }
    }
  }
`

export default connect(mapStateToProps)(graphql(firstQuery, {
    options: props => ({
        variables: {
            userName: props.fetchApp.user_name
        }
    })
})(Logged));
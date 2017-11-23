import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const additionalInfo = ({allAuthUsers, error, loading}) => {
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
    render() {
        const {last_visit} = this.props.fetchApp;
        const {allAuthUsers, loading, error} = this.props.getLoggedUser;
        if (loading) {
            return <h1>Loading...</h1>
        }
        if (error) {
            return <h1>Error: {error.message}</h1>
        }
        return (
            <div>
                <div className="title">
                    <h1>Hello {allAuthUsers.edges[0].node.userName}</h1>
                </div>
                <div className="body">
                    <p>Your last visit was at: {last_visit}</p>
                    {additionalInfo(this.props.getLoggedUser)}
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
const getUser = gql`
query getUser($id: Int!){
    allAuthUsers(ID:$id){
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

export default compose(
    connect(mapStateToProps),
    graphql(getUser, {
        name: 'getLoggedUser',
        options: props => ({
            variables: {
                id: props.fetchApp.user_id
            }
        })
    })
)(Logged);

// export default connect(mapStateToProps)(
// })(Logged));
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Users extends Component {
    render() {
        const {loading, error, allAuthUsers} = this.props.data;

        if (loading) {
            return <h1>Loading...</h1>
        }

        if (error) {
            return <h1>Error: {error.message}</h1>
        }

        return (
            <div>
                <h1>All users</h1>
                <ol>
                    {allAuthUsers.edges.map(user => (
                        <li key={user.node.id}>
                            <h2>{`${user.node.firstName} ${user.node.lastName}`}</h2>
                            <p>Edit <Link to={`/users/user/${user.node.ID}`}>{user.node.userName}</Link> user info</p>
                            <p>Email: <a href={`mailto:${user.node.email}`}>{user.node.email}</a></p>
                            <p>Role: {user.node.isSuperuser ? 'admin' : 'staff'}</p>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

const getAllUsers = gql`
query getAllUsers{
    allAuthUsers{
      edges{
        node{
          id
          ID
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

export default graphql(getAllUsers)(Users);
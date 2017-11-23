import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import UserInfoForm from '../UserElements/Forms/EditUser'
import { fetchApp } from '../../actions/fetching/fetchApp';

class User extends Component {
    submit = (values) => {
        // console.log(values);
        this.props.mutateUserById({
            variables: {
                id: +this.props.match.params.id,
                userName: values.userName,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
            }
        })
            .then(({data})=>{
                const {status} = data.editUserInfo;
                if (status) {
                    // this.props.fetchAppRequest();
                    this.props.getUserById.fetchMore({
                        variables: {
                            id: this.props.fetchApp.user_id
                        }
                    });
                }
            }).catch(error => {
                console.log('error', error)
            })
    }
    
    render() {
        const {allAuthUsers, loading, error } = this.props.getUserById;
        if (loading) {
            return <h1>Loading...</h1>
        }

        if (error) {
            return <h1>Error: {error.message}</h1>
        }
        // const {value} = this.props.input;
        const {userName} = allAuthUsers.edges[0].node;
        return (
            <div>
                <h1>Edit {userName} info</h1>
                <div className="info_form">
                    <UserInfoForm onSubmit={this.submit} match={this.props.match} initialValues={allAuthUsers.edges[0].node}/>
                </div>
            </div>
        );
    }
}

const getUsersUserByID = gql`
query getAllUsers($id: Int){
    allAuthUsers(ID:$id){
      edges{
        node{
          userName
          firstName
          lastName
          email
        }
      }
    }
  }
`
const mutateUserByID = gql`
mutation mutateUserInfo($id:Int!, $userName: String, $firstName: String, $lastName: String, $email: String) {
    editUserInfo(userInfo:{email:$email, userName:$userName, firstName:$firstName, lastName:$lastName, id:$id}){
        status
    }
}
`

function mapStateToProps(state) {
    const { input, form } = state;
    return {
        input,
        form
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAppRequest: () => {
            dispatch(fetchApp());
        }
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(getUsersUserByID, {
        name: 'getUserById',
        options: props => ({
            variables: {
                id: +props.match.params.id
            }
        })
    }),
    graphql(mutateUserByID, {
        name: 'mutateUserById',
        options: {
            refetchQueries: [
                'getAllUsers'
            ]
        }
    })
)(User);
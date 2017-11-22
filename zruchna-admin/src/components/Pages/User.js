import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import EditField from '../UserElements/EditField'
import {userNameInfoInputChange} from '../../actions/inputFields/inputActions'

class User extends Component {
    constructor(props){
        super(props);
        this.changeInfo = this.changeInfo.bind(this);
    }
    changeInfo(){
        const inputs = document.querySelectorAll('.editInfo_input');
        console.log(inputs);
    }
    render() {
        const {allAuthUsers, loading, error } = this.props.data;

        if (loading) {
            return <h1>Loading...</h1>
        }

        if (error) {
            return <h1>Error: {error.message}</h1>
        }
        const {value} = this.props.input;
        const {userName, firstName, lastName, email} = allAuthUsers.edges[0].node;
        return (
            <div>
                <h1>Edit {value ? value : userName} info</h1>
                <div className="info_form">
                    <EditField opt={{
                        id: "userName",
                        data: userName,
                        name: "User name",
                        func: this.props.userNameInfoInputChange
                    }}/>
                    <EditField opt={{
                        id: "firstName",
                        data:firstName,
                        name: "First name",
                        func: null
                    }}/>
                    <EditField opt={{
                        id: "lastName",
                        data:lastName,
                        name: "Last name",
                        func: null
                    }}/>
                    <EditField opt={{
                        id: "email",
                        data:email,
                        name: "email",
                        func: null
                    }}/>
                </div>
                <button onClick={this.changeInfo}>Edit info</button>
            </div>
        );
    }
}

const getUsersUserByID = gql`
query getAllUsers($id: Int){
    allAuthUsers(ID:$id){
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
function mapStateToProps(state) {
    const { input } = state;
    return {
        input,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userNameInfoInputChange: input => {
            dispatch(userNameInfoInputChange(input.currentTarget));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(getUsersUserByID, {
    options: props => ({
        variables:  {
            id: +props.match.params.id
        }
    })   
})(User));
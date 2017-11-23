import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';


class UserInfoForm extends Component {
    render() {
        const {handleSubmit, pristine, submitting} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">Username</label>
                    <Field name="userName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <Field name="email" component="input" type="text"/>
                </div>
                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}



export default reduxForm({form: 'userInfo'})(UserInfoForm)

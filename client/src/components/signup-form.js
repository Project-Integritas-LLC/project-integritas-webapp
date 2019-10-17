import React, { Component } from 'react';
import styled from 'react-emotion';
import Button from './button';
import { colors, unit } from '../styles';

export default class SignupForm extends Component {
    state = { email: '', password: '', firstName: '', lastName: '' };

    onChangeEmail = event => {
        const email = event.target.value;
        this.setState(s => ({ email }));
    };

    onChangePassword = event => {
        const password = event.target.value;
        this.setState({ password: password });
    };

    onChangeFirstName = event => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName });
    };

    onChangeLastName = event => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.signup(
            {
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                }
            });
    };

    render() {
        return (
            <StyledForm onSubmit={this.onSubmit}>
                <StyledInput
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    data-testid="login-input"
                    onChange={this.onChangeEmail}
                />
                <StyledInput
                    required
                    type="password"
                    name="Password"
                    placeholder="Password"
                    data-testid="login-input"
                    onChange={this.onChangePassword}
                />
                <StyledInput
                    required
                    type="text"
                    name="First Name"
                    placeholder="First Name"
                    data-testid="login-input"
                    onChange={this.onChangeFirstName}
                />
                <StyledInput
                    required
                    type="text"
                    name="Last Name"
                    placeholder="Last Name"
                    data-testid="login-input"
                    onChange={this.onChangeLastName}
                />
                <Button type="submit">Sign Up</Button>
            </StyledForm>
        );
    }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledForm = styled('form')({
    width: '100%',
    maxWidth: 406,
    padding: unit * 3.5,
    borderRadius: 3,
    boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
    color: colors.text,
    backgroundColor: 'white',
});

const StyledInput = styled('input')({
    width: '100%',
    marginBottom: unit * 2,
    padding: `${unit * 1.25}px ${unit * 2.5}px`,
    border: `1px solid ${colors.grey}`,
    fontSize: 16,
    outline: 'none',
    ':focus': {
        borderColor: colors.primary,
    },
});

import React, { Component } from 'react';
import styled, { css } from 'react-emotion';


import Button from './button';
import { colors, unit } from '../styles';

export default class LoginForm extends Component {
  state = { email: '', password: '' };

  onChangeEmail = event => {
    const email = event.target.value;
    this.setState(s => ({ email }));
  };

  onChangePassword = event => {
    const password = event.target.value;
    this.setState({ password: password });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.login(
      {
        variables: {
          email: this.state.email,
          password: this.state.password
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
          type="text"
          name="Password"
          placeholder="Password"
          data-testid="login-input"
          onChange={this.onChangePassword}
        />
        <Button type="submit">Log in</Button>
      </StyledForm>
    );
  }
}



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

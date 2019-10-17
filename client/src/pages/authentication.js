import React, { Component } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import space from '../assets/images/space.jpg';
import { LoginForm, Loading, Button } from '../components';
import Login from './login';
import Signup from './signup';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Curve } from '../assets/curve.svg';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { size } from 'polished';
import { colors, unit } from '../styles';
import styled, { css } from 'react-emotion';



export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: 'login' }
        this.onLoginButtonClicked = this.onLoginButtonClicked.bind(this)
        this.onSignupButtonClicked = this.onSignupButtonClicked.bind(this)
    }

    onLoginButtonClicked() {
        if (this.state.mode === 'signup') {
            this.setState({ mode: 'login' })
        }
    };
    onSignupButtonClicked() {
        if (this.state.mode === 'login') {
            this.setState({ mode: 'signup' })
        }
    };

    render() {
        return (
            <Container>
                <Header>
                    <StyledCurve />
                    <StyledLogo />
                </Header>
                <Button onClick={this.onLoginButtonClicked}>Login</Button>
                <Button onClick={this.onSignupButtonClicked}>SignUp</Button>
                <StyledRocket />
                <Heading>{this.state.mode}</Heading>
                {this.state.mode === 'login' ? <Login /> : <Signup />}
            </Container>
        )
    }
}
/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: unit * 6,
    color: 'white',
    backgroundColor: colors.primary,
    backgroundImage: `url(${space})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});


const svgClassName = css({
    display: 'block',
    fill: 'currentColor',
});

const Header = styled('header')(svgClassName, {
    width: '100%',
    marginBottom: unit * 5,
    padding: unit * 2.5,
    position: 'relative',
});

const StyledLogo = styled(Logo)(size(56), {
    display: 'block',
    margin: '0 auto',
    position: 'relative',
});

const StyledCurve = styled(Curve)(size('100%'), {
    fill: colors.primary,
    position: 'absolute',
    top: 0,
    left: 0,
});

const Heading = styled('h1')({
    margin: `${unit * 3}px 0 ${unit * 6}px`,
});

const StyledRocket = styled(Rocket)(svgClassName, {
    width: 250,
});
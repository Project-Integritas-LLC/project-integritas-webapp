import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Button from './button';

import { colors, unit } from '../styles';
import { navigate } from '@reach/router';

export default class CommitmentForm extends Component {
    state = { commitmentName: '', commitmentDescription: '' };

    onChangeName = event => {
        const name = event.target.value;
        this.setState({ commitmentName: name });
    };

    onChangeDescription = event => {
        const description = event.target.value;
        this.setState({ commitmentDescription: description });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.makeCommitment({
            variables:
            {
                name: this.state.commitmentName,
                description: this.state.commitmentDescription
            }
        }).then(navigate('/'));
    };

    render() {
        return (
            <Container>
                <Header>
                </Header>
                <Heading>Space Explorer</Heading>
                <StyledForm onSubmit={this.onSubmit}>
                    <StyledInput
                        required
                        type="string"
                        name="name"
                        placeholder="Commitment Name"
                        onChange={this.onChangeName}
                    />
                    <StyledInput
                        required
                        type="string"
                        name="description"
                        placeholder="Commitment Description"
                        onChange={this.onChangeDescription}
                    />
                    <Button
                        type="submit"
                        style={{ textDecoration: 'none' }}>
                        Make Commitment
                    </Button>
                </StyledForm>
            </Container>
        );
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


const Heading = styled('h1')({
    margin: `${unit * 3}px 0 ${unit * 6}px`,
});


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

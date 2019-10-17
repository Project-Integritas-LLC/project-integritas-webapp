import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './commitment-tile';

const CommitmentDetail = ({ id, name, description, belongsToUser }) => (
    <Card
        style={{
            backgroundImage: getBackgroundImage(id),
        }}
    >
        <h3>
            {name} ({description})
    </h3>
        <h5>Owner: {belongsToUser.firstName}</h5>
    </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
    height: 365,
    marginBottom: unit * 4,
});

export default CommitmentDetail;
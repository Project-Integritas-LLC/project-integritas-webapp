import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled, { css } from 'react-emotion';
import gql from 'graphql-tag';

import { GET_COMMITMENT_DETAILS } from '../pages/commitment';
import Button from '../components/button';
import galaxy from '../assets/images/galaxy.jpg';
import iss from '../assets/images/iss.jpg';
import moon from '../assets/images/moon.jpg';
import { unit } from '../styles';
import { Link } from '@reach/router';

const backgrounds = [galaxy, iss, moon];
export function getBackgroundImage(id) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}


export default function ActionButton({ id }) {
  return (
    <Button
      style={{
        backgroundImage: getBackgroundImage(id),
      }}
    >
      <Link
        to={`/commitment/addAction/${id}`}
        style={{
          textDecoration: 'none'
        }}>
        Add Action
        </Link>
    </Button>
  );
}

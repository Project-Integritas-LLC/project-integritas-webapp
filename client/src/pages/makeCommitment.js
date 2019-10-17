import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { CommitmentForm, Loading } from '../components';
import { GET_COMMITMENTS } from './commitments'
import { GET_COMMITMENT } from '../containers/cart-item';
import { COMMITMENT_TILE_DATA } from './commitments'

export const MAKE_COMMITMENT = gql`
  mutation MakeCommitment($name: String!, $description: String!) {
    makeCommitment(name: $name, description: $description) {
      commitment {
        ...CommitmentTile
      }
    }
  }
  ${COMMITMENT_TILE_DATA}
`

export default function MakeCommitment() {
  const [makeCommitment, { loading, error }] = useMutation(
    MAKE_COMMITMENT,
    // Update the list of commitments in cache after making a new commitment
    {
      update(cache, { data: { makeCommitment } }) {
        const { commitments } = cache.readQuery({ query: GET_COMMITMENTS });
        cache.writeQuery({
          query: GET_COMMITMENTS,
          data: {
            commitments: {
              ...commitments,
              commitments: commitments.commitments.concat([makeCommitment.commitment])
            }
          },
        });
      }
    }
  );
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <CommitmentForm makeCommitment={makeCommitment} />;
}

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import CommitmentTile from '../components/commitment-tile';
import { COMMITMENT_TILE_DATA } from '../pages/commitments';

export const GET_COMMITMENT = gql`
  query GetCommitment($commitmentId: ID!) {
    commitment(id: $commitmentId) {
      ...CommitmentTile
    }
  }
  ${COMMITMENT_TILE_DATA}
`;

export default function CartItem({ commitmentId }) {
  const { data, loading, error } = useQuery(
    GET_COMMITMENT,
    { variables: { commitmentId } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return data && <CommitmentTile commitment={data.commitment} />;
}

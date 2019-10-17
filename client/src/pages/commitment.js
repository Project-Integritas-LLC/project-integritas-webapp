import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { COMMITMENT_TILE_DATA } from './commitments';

import { Loading, Header, CommitmentDetail } from '../components';
import { ActionButton } from '../containers';

export const GET_COMMITMENT_DETAILS = gql`
  query CommitmentDetails($commitmentId: ID!) {
    commitment(id: $commitmentId) {
      ...CommitmentTile
      actions {
        body
      }
    }
  }
  ${COMMITMENT_TILE_DATA}
`;

export default function Commitment({ commitmentId }) {
  const { data, loading, error } = useQuery(
    GET_COMMITMENT_DETAILS,
    { variables: { commitmentId } },
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      <Header>
        {data.commitment.name}
      </Header>
      <CommitmentDetail {...data.commitment} />
      <ActionButton {...data.commitment} />
      {data.commitment.actions.length
        ? data.commitment.actions.map(
          action => <p key={action.id}>{action.body}</p>)
        : <p>Go do something</p>}
    </Fragment>
  );
}

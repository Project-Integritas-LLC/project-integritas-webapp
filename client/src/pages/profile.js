import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loading, Header, CommitmentTile } from '../components';
import { COMMITMENT_TILE_DATA } from './commitments';

export const GET_MY_COMMITMENTS = gql`
  query GetMyCommitments {
    me {
      id
      firstName
      lastName
      email
      commitments {
        cursor
        hasMore
        commitments {
          ...CommitmentTile
        }
      }
    }
  }
${COMMITMENT_TILE_DATA}
`;

export default function Profile() {
  const { data, loading, error } = useQuery(
    GET_MY_COMMITMENTS,
    { fetchPolicy: "network-only" }
  );
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  const { commitments, email, firstName, lastName } = data.me
  return (
    <Fragment>
      <Header>{firstName + " " + lastName} 's Commitments</Header>
      {commitments.commitments.length ? (
        commitments.commitments.map(commitment => (
          <CommitmentTile key={commitment.id} commitment={commitment} />
        ))
      ) : (
          <p>You haven't made any commitment</p>
        )}
    </Fragment>
  );
}

import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Loading, CommitmentTile } from '../components';
import { navigate } from '@reach/router';

export const COMMITMENT_TILE_DATA = gql`
  fragment CommitmentTile on Commitment {
    id
    name
    description
    belongsToUser {
      firstName
      lastName
      email
    }
  }
`;

export const GET_COMMITMENTS = gql`
  query GetCommitmentList($after: String) {
    commitments(after: $after) {
      cursor
      hasMore
      commitments {
        ...CommitmentTile
      }
    }
  }
  ${COMMITMENT_TILE_DATA}
`;


export default function Commitments() {
  const { data, loading, error, fetchMore } = useQuery(GET_COMMITMENTS)
  if (loading) return <Loading />;
  if (error) return <p>ERROR {console.log(error)}</p>;
  return (
    <Fragment>
      {data.commitments &&
        data.commitments.commitments &&
        data.commitments.commitments.map(commitment => (
          <CommitmentTile key={commitment.id} commitment={commitment} />
        ))}
      {data.commitments &&
        data.commitments.hasMore && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.commitments.cursor,
                },
                updateQuery: (previousResults, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousResults;
                  return {
                    ...fetchMoreResult,
                    commitments: {
                      ...fetchMoreResult.commitments,
                      commitments: [
                        ...previousResults.commitments.commitments,
                        ...fetchMoreResult.commitments.commitments,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </Button>
        )}
      <Button
        onClick={() => navigate('/makeCommitment')}>
        Make A Commitment
      </Button>

    </Fragment>
  );
}

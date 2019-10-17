import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Loading } from '../components';
import { NewActionForm } from '../containers'
import { GET_COMMITMENT_DETAILS } from './commitment'
export const ADD_ACTION = gql`
  mutation add($commitmentId: ID!, $body: String!) {
    addAction(commitmentId: $commitmentId, body: $body) {
      success
      action {
        body
      }
    }
  }
`;

export default function AddAction({ commitmentId }) {
  const [addAction, { loading, error }] = useMutation(
    ADD_ACTION,
    // Update the list of actions in cache after adding a new action
    {
      update(cache, { data: returnedData }) {
        const { commitment } = cache.readQuery({
          query: GET_COMMITMENT_DETAILS,
          variables: {
            commitmentId: commitmentId
          }
        });
        cache.writeQuery({
          query: GET_COMMITMENT_DETAILS,
          variables: {
            commitmentId: commitmentId
          },
          data: {
            commitment: {
              ...commitment,
              actions: commitment.actions.concat([returnedData.addAction.action])
            }
          },
        });
      }
    }
  );
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <NewActionForm
    commitmentId={commitmentId}
    onSubmit={addAction} />;
}

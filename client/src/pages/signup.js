import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SignupForm, Loading } from '../components';

export const SIGNUP_USER = gql`
  mutation signup($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
      signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName)
    }
`;

export default function Signup() {
    const client = useApolloClient();
    const [signup, { loading, error }] = useMutation(
        SIGNUP_USER,
        {
            onCompleted({ signup }) {
                if (signup) {
                    localStorage.setItem('token', signup);
                    client.writeData({ data: { isLoggedIn: true } });
                }
                else {
                    alert("Email existed")
                }
            }
        }
    );

    if (loading) return <Loading />;
    if (error) return <p>An error occurred</p>;

    return <SignupForm signup={signup} />;
}

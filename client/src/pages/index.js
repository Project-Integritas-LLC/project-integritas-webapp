import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import 'react-sortable-tree/style.css';


import Commitments from './commitments'
import Commitment from './commitment'
import Cart from './cart';
import Profile from './profile';
import MakeCommitment from './makeCommitment'
import AddAction from './addAction'
import { Footer, PageContainer } from '../components';
import Login from './login';
import Signup from './signup';


export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Commitments path="/" />
          <Commitment path="commitment/:commitmentId" />
          <AddAction path="commitment/addAction/:commitmentId" />
          <MakeCommitment path="makeCommitment" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}

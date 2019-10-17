const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    commitments(
      pageSize: Int
      after: String
    ): CommitmentConnection!
    commitment(id: ID!): Commitment
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    makeCommitment(name: String, description: String): CommitmentUpdateResponse!

    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    addAction(commitmentId: ID!, body: String!): ActionUpdateResponse!

    login(email: String!, password: String!): String # login token

    signup(email: String!, password: String!, firstName: String!, lastName: String!): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type ActionUpdateResponse {
    success: Boolean!
    action: Action
  }

  type CommitmentUpdateResponse {
    success: Boolean!
    message: String
    commitment: Commitment
  }

  """
  Input Types for Mutation
  """
  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input CreateCommitmentInput {
    name: String!
    description: String!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  type CommitmentConnection {
    cursor: String
    hasMore: Boolean!
    commitments: [Commitment]!
  }

  type Commitment {
    id: ID!
    name: String
    description: String
    actions: [Action]!
    belongsToUser: User
  }

  type UserFollow {
    id: ID!
    user: User
    followsUser: User
  }

  type Action {
    id: ID!
    body: String
    belongsToCommitment: Commitment
    belongsToUser: User
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    commitments: CommitmentConnection!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;

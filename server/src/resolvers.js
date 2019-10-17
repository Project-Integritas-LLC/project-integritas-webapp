const { paginateResults, getCursor } = require('./utils');

module.exports = {
  Query: {
    commitments: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allCommitments = await dataSources.userAPI.getAllCommitments()
      const commitments = paginateResults({
        after,
        pageSize,
        results: allCommitments
      });
      return {
        commitments,
        cursor: commitments.length ? getCursor(commitments[commitments.length - 1]) : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: commitments.length
          ? getCursor(commitments[commitments.length - 1]) !==
          getCursor(allCommitments[allCommitments.length - 1])
          : false
      }
    },
    commitment: async (_, { id }, { dataSources }) => {
      const result = await dataSources.userAPI.getCommitmentById({ commitmentId: id })
      return {
        id: result.dataValues.id,
        name: result.dataValues.name,
        description: result.dataValues.description,
        belongsToUser: result.dataValues.belongsToUser
      }
    }
    ,
    me: async (_, __, { dataSources }) => {
      const user = await dataSources.userAPI.getCurrentUser()
      console.log(user)
      return user
    }
  },
  Mutation: {
    makeCommitment: async (_, { name, description }, { dataSources }) => {
      const commitment = await dataSources.userAPI.makeCommitment({ name, description });
      return {
        success: true,
        message: 'succesful',
        commitment: commitment.dataValues
      }
    },

    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? 'trips booked successfully'
            : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id),
            )}`,
        launches,
      };
    },
    addAction: async (_, { commitmentId, body }, { dataSources }) => {
      const action = dataSources.userAPI.addAction({ commitmentId, body })

      return {
        success: !!action,
        action: action
      }
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: 'failed to cancel trip',
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
    login: async (_, { email, password }, { dataSources }) => {
      const user = await dataSources.userAPI.findUserByEmail({ email })
      const token = user && user.dataValues.password === password
        ? new Buffer(email).toString('base64') : null;
      return token
    },
    signup: async (_, { email, password, firstName, lastName }, { dataSources }) => {
      const user = await dataSources.userAPI.createNewUser(
        { email, password, firstName, lastName });
      return user ? new Buffer(email).toString('base64') : null
    }
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  Mission: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  //TO-DO: CHECK COMMITMENT
  Commitment: {
    belongsToUser: async (commitment, _, { dataSources }) => {
      const ownerId = commitment.belongsToUser
      const results = await dataSources.userAPI.findUserById({ userId: ownerId })
      const owner = {
        id: results.dataValues.id,
        firstName: results.dataValues.firstName,
        lastName: results.dataValues.lastName,
        email: results.dataValues.email
      }
      return owner
    }
    ,
    actions: async (commitment, _, { dataSources }) =>
      dataSources.userAPI.getActionsByCommitmentId({ commitmentId: commitment.id })
  },
  User: {
    commitments: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allCommitments = await dataSources.userAPI.getCommitmentsByUser()
      const commitments = paginateResults({
        after,
        pageSize,
        results: allCommitments
      });
      return {
        cursor: commitments.length ? getCursor(commitments[commitments.length - 1]) : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: commitments.length
          ? getCursor(commitments[commitments.length - 1]) !==
          getCursor(allCommitments[allCommitments.length - 1])
          : false,
        commitments
      }
    },
  },
};

const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getCurrentUser() {
    const userId = this.context.user.id
    const user = await this.store.users.findByPk(userId)
    return user ? user : null
  }
  async findUserByEmail({ email }) {
    const user = await this.store.users.findOne({
      where: { email }
    })
    return user ? user : null
  }

  async createNewUser({ email, password, firstName, lastName }) {
    const [user, created] = await this.store.users.findOrCreate({
      where: { email },
      defaults: { password, firstName, lastName }
    })
    return created ? user : null
  }

  async findUserById({ userId }) {
    const user = await this.store.users
      .findByPk(userId)
    return user
  }

  async bookTrips({ launchIds }) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async makeCommitment({ name, description }) {
    const userId = this.context.user.id;
    // Create and store commitment
    const commitment = await this.store.commitments.create({
      name: name,
      description: description,
      belongsToUser: userId
    })
    return commitment
  }


  async addAction({ commitmentId, body }) {
    const action = await this.store.actions.create({
      belongsToCommitment: commitmentId,
      body: body
    })
    return action

  }

  async getActionsByCommitmentId({ commitmentId }) {
    const res = await this.store.actions.findAll({
      where: { belongsToCommitment: commitmentId }
    })
    return res && res.length ? res : []
  }

  async getAllCommitments() {
    const allCommitments = await this.store.commitments.findAll()
    return allCommitments
  }

  async getCommitmentsByUser() {
    const userId = this.context.user.id;
    const commitments = await this.store.commitments.findAll({
      where: {
        belongsToUser: userId
      }
    })
    return commitments
  }

  async getCommitmentById({ commitmentId }) {
    const result = await this.store.commitments
      .findByPk(commitmentId)
    return result
  }

  async getLaunchIdsByUser() {
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }
}

module.exports = UserAPI;

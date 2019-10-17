const SQL = require('sequelize');

module.exports.getCursor = (item) => item.id.toString();
module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = (item) => item.id.toString(),
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {

    let itemCursor = getCursor(item);
    return itemCursor === cursor
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
        cursorIndex + 1,
        Math.min(results.length, cursorIndex + 1 + pageSize),
      )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('projectintegritas', 'projectintegritas', 'projectintegritas', {
    dialect: 'postgres',
    operatorsAliases,
    logging: false,
  });


  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    password: SQL.STRING,
    firstName: SQL.STRING,
    lastName: SQL.STRING,
    token: SQL.STRING,
  });

  const commitments = db.define('commitments', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    description: SQL.STRING,
    belongsToUser: {
      type: SQL.INTEGER,
      references: {
        model: users,
        key: 'id',
        deferrable: SQL.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })

  const actions = db.define('actions', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    body: SQL.STRING,
    belongsToCommitment: {
      type: SQL.INTEGER,
      references: {
        model: commitments,
        key: 'id',
        deferable: SQL.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    belongsToUser: {
      type: SQL.INTEGER,
      references: {
        model: users,
        key: 'id',
        deferrable: SQL.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })

  const userFollows = db.define('userFollows', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    user: {
      type: SQL.INTEGER,
      references: {
        model: users,
        key: 'id',
        deferable: SQL.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    followsUser: {
      type: SQL.INTEGER,
      references: {
        model: users,
        key: 'id',
        deferable: SQL.Deferrable.INITIALLY_IMMEDIATE
      }
    },

  })

  const trips = db.define('trip', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    launchId: SQL.INTEGER,
    userId: SQL.INTEGER,
  });
  db.sync()
  return { users, trips, commitments, actions, userFollows };
};


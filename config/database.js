/*module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
*/
// config/database.js

const getDatabaseConfig = ({ env }) => {
  if (
    env("IS_OFFLINE", null) === "true" ||
    env("LAMBDA_RUNTIME_DIR", null) === null
  ) {
    // In local simulated Lambda or normal Strapi
    return {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      options: {
        useNullAsDefault: true,
      },
    };
  } else {
    // In Lambda on AWS
    return {
      connector: "bookshelf",
      settings: {
        /*client: "postgres",
        host: env('DATABASE_HOST', 'serverless-database.cluster-chjru6n6jaxf.eu-west-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi_app'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'RUU4BNle0q7qKykEWepx'),*/
        client: "sqlite",
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      options: {
        useNullAsDefault: true,
      },
    };
  }
};

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: getDatabaseConfig({ env }),
  },
});

import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres"); // <-- FORCE POSTGRES

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"), // <-- Render provides this
        ssl: { rejectUnauthorized: false },   // <-- REQUIRED ON RENDER
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: { min: 2, max: 10 },
    },

    // Keep sqlite ONLY as a fallback (not used in production)
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};

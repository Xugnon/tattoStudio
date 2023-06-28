const NodeEnvironment = require("jest-environment-node").default;
const { v4 } = require("uuid");
const { execSync } = require("child_process");
const { resolve, join } = require("path");
const { Client } = require("pg");

const prismaBinary = join(__dirname, "../node_modules/.bin/prisma");

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.testing"),
});

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.schema = `test_${v4()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;

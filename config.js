const Pool = require("pg").Pool;

const pool = new Pool({
  user: "api_user",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "stadnina_api"
});

module.exports = pool;
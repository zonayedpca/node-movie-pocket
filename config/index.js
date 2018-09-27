const { port, db, secret, omdbiapikey } = process.env.NODE_ENV ? require('./prod') : require('./dev');

module.exports = {
  port,
  db,
  secret,
  omdbiapikey
}

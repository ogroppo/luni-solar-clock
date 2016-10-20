module.exports = {
  servers: {
    one: {
      host: '178.62.24.197',
      username: 'root',
      password: "N0wledge"
      // pem: "~/.ssh/no_pass"
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'nowledge',
    path: '../',
    //port: 88
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
      debug: true
    },
    env: {
      MONGO_URL: 'mongodb://localhost/nowledge'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },

};
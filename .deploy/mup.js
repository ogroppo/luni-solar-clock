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
    name: 'clock',
    path: '../',
    port: 81,
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
      debug: true
    },
    env: {
      MONGO_URL: 'mongodb://localhost/clock',
      PORT: 81
    },
    docker: {
      //image: 'kadirahq/meteord' // (optional)
      image: 'abernix/meteord:base' // use this image if using Meteor 1.4+
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  }

};
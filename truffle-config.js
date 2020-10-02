module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0xa78707c43091799bd0bb56abeba250239701b4a7", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8545,
      gas: 2900000
  },
  rpc: {
    host: 'localhost',
    port:8080
  }
    /*test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }*/
  },

  compilers: {
    solc: {
      version: "0.6.12"
    }
  }
};

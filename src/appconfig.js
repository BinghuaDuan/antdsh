const env = 'dev';

const appconfig = {};

appconfig.dev = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
};

appconfig.prod = {
  prod: {
    defaultServer: {
      host: 'http://localhost:18080',
    },
    dbhServer: {
      host: 'http://dbh.brianxkliu.xyz',
    },
  }
};

export default appconfig[env]

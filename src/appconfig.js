const env = 'test';

const appconfig = {};

appconfig.dev = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
};

appconfig.test = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
};

appconfig.prod = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://localhost:8085',
  },
};

export default Object.assign(appconfig[env], { env })

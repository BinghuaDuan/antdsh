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
    host: 'http://api.brianxkliu.xyz',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
};

export default Object.assign(appconfig[env], { env })

const env = 'dev';

const appconfig = {};

appconfig.dev = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  neo4jBrowserUrl: "http://39.106.69.57:7474/browser/",
};

appconfig.test = {
  defaultServer: {
    host: 'http://demo2.com:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  neo4jBrowserUrl: "http://39.106.69.57:7474/browser/",
};

appconfig.prod = {
  defaultServer: {
    host: 'http://api.brianxkliu.xyz',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  neo4jBrowserUrl: "http://39.106.69.57:7474/browser/",
};

export default Object.assign(appconfig[env], { env })

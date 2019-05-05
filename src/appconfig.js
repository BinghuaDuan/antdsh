const env = 'test';

const appconfig = {};

appconfig.dev = {
  defaultServer: {
    host: 'http://localhost:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  casServer: {
    host: 'https://cas.server.com:8443/cas',
  },
  neo4jBrowserUrl: "http://localhost:11002/browser/",
};

appconfig.test = {
  defaultServer: {
    host: 'http://demo2.com:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  casServer: {
    host: 'https://cas.server.com:8443/cas',
    logoutUrl: 'https://cas.server.com:8443/cas/logout',
  },
  neo4jBrowserUrl: "http://localhost:11002/browser/",
};

appconfig.prod = {
  defaultServer: {
    host: 'http://api.brianxkliu.xyz',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  casServer: {
    host: 'https://cas.server.com:8443/cas',
  },
  neo4jBrowserUrl: "http://localhost:11002/browser/",
};

export default Object.assign(appconfig[env], { env })

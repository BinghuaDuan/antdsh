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
    host: 'https://ices.beim.site:18443/cas',
    logoutUrl: 'https://ices.beim.site:18443/cas/logout',
  },
  neo4jBrowserUrl: "http://localhost:5000/browser",
};

appconfig.test = {
  defaultServer: {
    host: 'http://192.168.1.118:23900',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  casServer: {
    host: 'https://ices.beim.site:18443/cas',
    logoutUrl: 'https://ices.beim.site:18443/cas/logout',
  },
  neo4jBrowserUrl: "http://ices.beim.site:15474/browser",
};

appconfig.prod = {
  defaultServer: {
    host: 'http://ices.beim.site:18080',
  },
  dbhServer: {
    host: 'http://dbh.brianxkliu.xyz',
  },
  casServer: {
    host: 'https://cas.server.com:18443/cas',
    logoutUrl: 'https://ices.beim.site:18443/cas/logout',
  },
  neo4jBrowserUrl: "http://ices.beim.site:15474/browser",
};

export default Object.assign(appconfig[env], { env })

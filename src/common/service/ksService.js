import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['defaultServer']['host'];

const keywordSearch = async (query) => {
  const response = await fetch(`${defaultUrlPrefix}/keywordsearch/`, {
    'method': 'POST',
    credentials: 'include',
    'headers': {
      'content-type': 'application/json'
    },
    'body': JSON.stringify({query})
  })
  return response
};

export default {keywordSearch}
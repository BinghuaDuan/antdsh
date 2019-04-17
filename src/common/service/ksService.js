// keyword search service

const keywordSearch = async (query) => {
  const response = await fetch('/keywordsearch/', {
    'method': 'POST',
    'headers': {
      'content-type': 'application/json'
    },
    'body': JSON.stringify({query})
  })
  return response
};

export default {keywordSearch}
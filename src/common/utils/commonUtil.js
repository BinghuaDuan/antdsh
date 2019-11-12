import querystring from "querystring";

const commonUtil = {}

commonUtil.getQuery = () => {
  let search = window.location.search;
  if (search === "") return {};
  search = search.split('?')[1];
  return querystring.parse(search);
};

commonUtil.getQueryVal = (key) => {
  return commonUtil.getQuery()[key];
};

export default commonUtil;
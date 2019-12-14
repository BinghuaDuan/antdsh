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

commonUtil.download = (content, filename) => {
  // 创建隐藏的可下载链接
  let eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  let blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

export default commonUtil;
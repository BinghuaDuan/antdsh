import appconfig from "../../appconfig";

const defaultUrlPrefix = appconfig["dbhServer"]["host"];
const appRecommendService = {};

const fakeResponse = {
  getIncdecInfo: {
    ok: true,
    json: async () => {
      return [
        {
          "id": 5,
          "appname": "用电脑发短信",
          "incdectype": "+",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 6,
          "appname": "美团",
          "incdectype": "+",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 7,
          "appname": "饿了么",
          "incdectype": "+",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 8,
          "appname": "百度地图",
          "incdectype": "+",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 9,
          "appname": "用电脑发短信",
          "incdectype": "+",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 10,
          "appname": "聚旅游",
          "incdectype": "-",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 11,
          "appname": "高德地图",
          "incdectype": "-",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 12,
          "appname": "微信",
          "incdectype": "-",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
        {
          "id": 13,
          "appname": "京东",
          "incdectype": "-",
          "category": "天气",
          "crawltime": "2019-04-17"
        },
      ]
    }
  },
  getAppInfo: {
    ok: true,
    json: async () => {
      return [
        {
          "id": 7,
          "appname": "百度地图",
          "introduction": "5亿人都在用的...",
          "imageurl": "http://static.yingyonghui.com/icon/128/6406926.png",
          "crawltime": "2019-04-17"
        }
      ]
    }
  },
  getAppFunctionInfo: {
    ok: true,
    json: async () => {
      return [
        {
          "appname": "百度地图",
          "updateversion": "版本：2.0",
          "updatetime": "2019-03-28",
          "updatefunction": "语音导航,路线规划"
        },
        {
          "appname": "百度地图",
          "updateversion": "版本：3.0",
          "updatetime": "2019-04-19",
          "updatefunction": "路口放大"
        },
        {
          "appname": "百度地图",
          "updateversion": "版本：3.0",
          "updatetime": "2019-04-19",
          "updatefunction": "景点讲解"
        },
        {
          "appname": "百度地图",
          "updateversion": "版本：3.0",
          "updatetime": "2019-04-19",
          "updatefunction": "更新新功能"
        },
        {
          "appname": "百度地图",
          "updateversion": "版本：3.1",
          "updatetime": "2019-04-20",
          "updatefunction": "林志玲语音包"
        }
      ]
    }
  },
  getAppPopularity: {
    ok: true,
    json: async () => {
      return [
        {
          "id": 1786,
          "appname": "百度地图",
          "download": 10280000,
          "reviewpeople": 2056,
          "likerate": 0.8,
          "crawltime": "2019-04-16"
        }
      ]
    }
  },
  getRecommendApps: {
    ok: true,
    json: async () => {
      return {
        "ok": true,
        "likeapp": `["邻居", "物联通V5.8.3", "拉手团购", "定时达人", "虫洞语音助手"]`
      }
    }
  },
  getUserTrackInfo: {
    ok: true,
    json: async () => {
      return [
        {
          appname: "百度",
          values: "[4, 10, 11]",
        },
        {
          appname: "美团",
          values: "[4, 4, 4]",
        },
        {
          appname: "知乎",
          values: "[6, 2, 6]",
        },
        {
          appname: "饿了么",
          values: "[10, 11, 12]",
        },
        {
          appname: "京东",
          values: "[6, 6, 2]",
        },
        {
          appname: "京东金融",
          values: "[3, 2, 3]",
        },
        {
          appname: "淘宝",
          values: "[12, 12, 12]",
        },
        {
          appname: "阿里巴巴",
          values: "[1, 2, 3]",
        },
        {
          appname: "网易新闻",
          values: "[8, 8, 8]",
        },
        {
          appname: "bilibili",
          values: "[11, 12, 13]",
        },
      ]
    }
  }
};


/**
 * GET 当日增减
 * /infocollection/incdecrequest/
 * 接口输出[{...}] (数组中只有一个item)
 * 异常输出[]
 */
appRecommendService.getIncdecInfo = async () => {
  if (appconfig.env === 'dev') return fakeResponse['getIncdecInfo'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/incdecrequest/`, {
    method: "GET",
    credentials: "include",
  });
  return response;
};

/**
 * GET 获取app 信息
 * /infocollection/introductiongetone/[app_name]
 * 接口输出[{...}] (数组中只有一个item)
 * 异常输出[]
 */
appRecommendService.getAppInfo = async (appName) => {
  if (appconfig.env === 'dev') return fakeResponse['getAppInfo'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/introductiongetone/${appName}`, {
    method: "GET",
    credentials: "include",
  });
  return response;
};

/**
 * GET 获取功能信息
 * /infocollection/functionsetgetone/[app_name]
 * 假设相同时间对应相同版本 1：1
 *（使用时间排序，group by version）
 * 接口输出[{...}]
 * 异常输出[]
 * @param appName
 * @returns {Promise<void>}
 */
appRecommendService.getAppFunctionInfo = async (appName) => {
  if (appconfig.env === 'dev') return fakeResponse['getAppFunctionInfo'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/functionsetgetone/${appName}`, {
    method: "GET",
    credentials: "include",
  });
  return response;
};

/**
 * GET 获取欢迎度信息
 * /infocollection/popularitygetone/[app_name]
 * @param appName
 * @returns {Promise<void>}
 */
appRecommendService.getAppPopularity = async (appName) => {
  if (appconfig.env === 'dev') return fakeResponse['getAppPopularity'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/popularitygetone/${appName}`, {
    method: "GET",
    credentials: "include",
  });
  return response;
};


/**
 * GET 针对用户的推荐结果
 * /infocollection/recommendrequest/[username]
 * 输出
 * {
 *   ok: true,
 *   likeapp: ["百度", "微信", ...]
 * }
 * 异常输出
 * {
 *   ok: false
 * }
 * @param username
 * @returns {Promise<Response>}
 */
appRecommendService.getRecommendApps = async (username) => {
  if (appconfig.env === 'dev') return fakeResponse['getRecommendApps'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/recommendrequest/${username}`, {
    method: "GET",
    credentials: "include",
  });
  return response;
};

/**
 * POST 用户轨道文件上传
 * /infocollection/uploadprocess
 * 表单方式提交
 * body: {
 *   username: String,
 *   trackfile: File,
 * }
 * @param username
 * @param trackFile
 * @returns {Promise<Response>}
 */
appRecommendService.uploadTrackFile = async (username, trackFile) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("trackfile", trackFile);
  const response = await fetch(`${defaultUrlPrefix}/infocollection/uploadprocess/`, {
    method: "POST",
    credentials: "include",
    body: formData
  });
  return response;
};

appRecommendService.getUserTrackInfo = async (username) => {
  if (appconfig.env === 'dev' || true) return fakeResponse['getUserTrackInfo'];
  const response = await fetch(`${defaultUrlPrefix}/infocollection/track/${username}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};


export default appRecommendService;
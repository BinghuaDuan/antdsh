import RESULT from '../../common/constant/Result';
import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['dbhServer']['host'];
const appRecommendService = {};

/**
 * GET 当日增减
 * /infocollection/incdecrequest/
 * 接口输出[{...}] (数组中只有一个item)
 * 异常输出[]
 */
appRecommendService.getIncdecInfo = async () => {
  const response = await fetch(`${defaultUrlPrefix}/infocollection/incdecrequest/`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
  return {
    ok: true,
    json: async () => {
      return {
        code: RESULT.DEFAULT_SUCC_CODE,
        data: [
          {
            "id":5,
            "appname":"用电脑发短信",
            "incdectype":"+",
            "crawltime":"2019-04-17"
          },
          {
            "id":5,
            "appname":"美团",
            "incdectype":"+",
            "crawltime":"2019-04-17"
          },
          {
            "id":5,
            "appname":"饿了么",
            "incdectype":"+",
            "crawltime":"2019-04-17"
          },
          {
            "id":5,
            "appname":"百度地图",
            "incdectype":"+",
            "crawltime":"2019-04-17"
          },
          {
            "id":5,
            "appname":"用电脑发短信",
            "incdectype":"+",
            "crawltime":"2019-04-17"
          },
          {
            "id":6,
            "appname":"聚旅游",
            "incdectype":"-",
            "crawltime":"2019-04-17"
          },
          {
            "id":6,
            "appname":"高德地图",
            "incdectype":"-",
            "crawltime":"2019-04-17"
          },
          {
            "id":6,
            "appname":"微信",
            "incdectype":"-",
            "crawltime":"2019-04-17"
          },
          {
            "id":6,
            "appname":"京东",
            "incdectype":"-",
            "crawltime":"2019-04-17"
          },
        ]
      }
    }
  }
};

/**
 * GET 获取app 信息
 * /infocollection/introductiongetone/[app_name]
 * 接口输出[{...}] (数组中只有一个item)
 * 异常输出[]
 */
appRecommendService.getAppInfo = async (appName) => {
  const response = await fetch(`${defaultUrlPrefix}/infocollection/introductiongetone/${appName}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
  return {
    ok: true,
    json: async () => {
      return {
        code: RESULT.DEFAULT_SUCC_CODE,
        data: [
          {
            "id":7,
            "appname":"百度地图",
            "introduction":"5亿人都在用的...",
            "imageurl":"http://static.yingyonghui.com/icon/128/6406926.png",
            "crawltime":"2019-04-17"
          }
        ]
      }
    }
  }
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
  const response = await fetch(`${defaultUrlPrefix}/infocollection/functionsetgetone/${appName}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
  return {
    ok: true,
    json: async () => {
      return {
        code: RESULT.DEFAULT_SUCC_CODE,
        data: [
          {
            "appname": "百度地图",
            "updateversion":"版本：2.0",
            "updatetime":"2019-03-28",
            "updatefunction":"语音导航，路线规划"
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
    }
  }
};

/**
 * GET 获取欢迎度信息
 * /infocollection/popularitygetone/[app_name]
 * @param appName
 * @returns {Promise<void>}
 */
appRecommendService.getAppPopularity = async (appName) => {
  const response = await fetch(`${defaultUrlPrefix}/infocollection/popularitygetone/${appName}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
  return {
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
  }
};


export default appRecommendService;
// main page service

const mainPageService = {};

mainPageService.mainHomeData = async (query) => {
  return {
    ok: true,
    json: () => [
      // {
      //   cid: 1,
      //   label: '导航',
      //   products: [
      //     {
      //       pid: 1,
      //       href: '/schema',
      //       imgSrc: "/images/R-blue.png",
      //       title: '模板',
      //       desc: '服务资源模板',
      //     },
      //     {
      //       pid: 1,
      //       href: 'http://192.168.1.118:17474/browser/',
      //       imgSrc: "/images/M-blue.png",
      //       title: '资源',
      //       desc: '服务资源浏览',
      //     },
      //     {
      //       pid: 1,
      //       href: '/main/detail/1',
      //       imgSrc: "/images/T-blue.png",
      //       title: '待定',
      //       desc: '该模块将在后续扩展',
      //     },
      //     {
      //       pid: 1,
      //       href: '/main/detail/1',
      //       imgSrc: "/images/T-blue.png",
      //       title: '待定',
      //       desc: '该模块将在后续扩展',
      //     },
      //   ]
      // },
      {
        cid: 1,
        label: '跨界服务质量实时感知器',
        products: [
          {
            pid: 1,
            href: 'http://sp.shawnzeng.com/',
            title: '基于外部观察者模式的实时感知器',
            desc: '系统可以在路由网络中通过对跨界服务间相互调用的IP路由进行监测，进而还原跨界服务的执行过程，并从中感知过程中的质量问题。',
            target: 'shishiganzhiqi',
          },
          {
            pid: 1,
            href: '',
            title: '待定',
            desc: '功能将在后续扩展',
            target: '',
          },
        ]
      },
      {
        cid: 2,
        label: '面向跨界服务环境资源的感知器',
        products: [
          {
            pid: 1,
            href: '/schema',
            title: '面向跨界异构服务融合的服务资源库',
            desc: '面向跨界异构服务融合，利用众包方式构建服务资源库，允许用户按照指定的schema定义接入新的服务资源。平台将自动将新的服务资源描述融入到服务资源描述知识图谱中。',
            target: 'bianhuaganzhiqi',
          },
          {
            pid: 1,
            href: '/app/search',
            title: '互联网服务应用功能-质量-价值变化感知器',
            desc: '通过对不同的服务分发渠道、资讯平台等信息源进行监听，及时的提取互联网服务应用在功能、质量以及价值方面的变化情况，并结合个人服务偏好数据，实现个性化服务推荐。',
            target: 'bianhuaganzhiqi',
          },
          {
            pid: 1,
            href: 'http://60.205.188.102:9901',
            title: '跨界服务质量与价值事件感知器',
            desc: '系统通过大量采集与跨界服务相关的新闻媒体资讯，从中提取相关的实体关系信息以及事件信息，并将其融合成混合知识图谱，支持用户上传自定义分类算法生成分界与话题，从而实现具有时空界多维视角的跨界服务事件分析模型。',
            target: 'shijianganzhiqi',
          },
          {
            pid: 1,
            href: '',
            title: '待定',
            desc: '功能将在后续扩展',
            target: '',
          },
        ]
      },
      {
        cid: 1,
        label: '面向质量与价值问题的跨界服务演化工具',
        products: [
          {
            pid: 1,
            href: 'http://60.205.188.102:8085/',
            title: '面向质量与价值问题的跨界服务演化工具',
            desc: '系统面向边缘服务计算场景中人群移动所带来的需求动态演化问题，以保障用户服务SLA 及高可用性为目标，按照指定方式提供边缘节点自演化策略。',
            target: 'yanhuagongju',
          },
          {
            pid: 1,
            href: '',
            title: '待定',
            desc: '功能将在后续扩展',
          },
        ]
      },
    ]
  }
};

mainPageService.productDetailData = async (pid) => {
  return {
    ok: true,
    json: async () => {
      return {
        pid,
        title: '关键词搜索',
        headImgSrc: 'https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_150x112.png',
        desc: '耐思云虚拟主机是构建在百度云上的虚拟主机产品，所有底层硬件采用百度开放云主机架构，经过多年的开发和运营，耐思云虚拟主机已经打造成为操作简单、功能强大、稳定可靠的高性价比企业主机产品！',
        demoHref: '/demo/KeywordSearch',
        productParams: {
          '参数1': '参数值1',
          '参数2': '参数值2',
          '参数3': '参数值3',
          '参数4': '参数值4',
        },
        productDetail: {
          imgSrc: 'https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_detail.png'
        },
        productNotice: {
          text: '使用须知使用须知使用须知使用须知使用须知'
        }
      }
      
    }
  }
};

mainPageService.relatedProductsData = async (pid) => {
  return {
    ok: true,
    json: async () => {
      return [
        {
          imgSrc: 'https://product-upload-picture.bj.bcebos.com/2316cfb9-b7b6-4b6e-8eed-3f6601767f7d/429018f4-cb3a-444f-8705-1d0664dedde1/1/picture_fb5ce044-a6eb-4b2e-8e85-d18bb5da9c3b.png',
          title: '标题标题标题',
          desc: '描述描述描述描述描述描述描述描述描述描述描述描述描',
          href: '/main/detail/1',
        },
        {
          imgSrc: 'https://product-upload-picture.bj.bcebos.com/2316cfb9-b7b6-4b6e-8eed-3f6601767f7d/429018f4-cb3a-444f-8705-1d0664dedde1/1/picture_fb5ce044-a6eb-4b2e-8e85-d18bb5da9c3b.png',
          title: '标题标题标题',
          href: '/main/detail/1',
          desc: '描述描述描述描述描述描述描述描述描述描述描述描述描'
        },
        {
          imgSrc: 'https://product-upload-picture.bj.bcebos.com/2316cfb9-b7b6-4b6e-8eed-3f6601767f7d/429018f4-cb3a-444f-8705-1d0664dedde1/1/picture_fb5ce044-a6eb-4b2e-8e85-d18bb5da9c3b.png',
          title: '标题标题标题',
          href: '/main/detail/1',
          desc: '描述描述描述描述描述描述描述描述描述描述描述描述描'
        },
      ]
    }
  }
}

export default mainPageService;
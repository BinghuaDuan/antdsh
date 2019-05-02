// main page service

const mainPageService = {};

mainPageService.mainHomeData = async (query) => {
  return {
    ok: true,
    json: () => [
      {
        cid: 1,
        label: '推荐',
        products: [
          {
            pid: 1,
            href: '/app/search',
            imgSrc: "https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_150x112.png",
            title: '外部服务变化感知器',
            desc: '外部服务的功能-质量-价值变化感知',
          },
          {
            pid: 1,
            href: '/main/detail/1',
            imgSrc: "https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_150x112.png",
            title: '标题',
            desc: '描述描述描述描述描述',
          },
          {
            pid: 1,
            href: '/main/detail/1',
            imgSrc: "https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_150x112.png",
            title: '标题',
            desc: '描述描述描述描述描述',
          },
          {
            pid: 1,
            href: '/main/detail/1',
            imgSrc: "https://product-upload-picture.bj.bcebos.com/naisinike/076972b8-c5f0-4d87-911b-c62e1e69c25f/v1baidu_150x112.png",
            title: '标题',
            desc: '描述描述描述描述描述',
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